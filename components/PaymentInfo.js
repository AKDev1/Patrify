"use client"
import React, { useEffect, useState } from 'react'
import { createRazorpayOrder, fetchUser, fetchPaymentsToUser } from '@/actions/dbActions'
import { useSession } from 'next-auth/react'
import { get } from 'mongoose';
import { useRouter, useSearchParams } from 'next/navigation';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { Router } from 'next/router';
// import Razorpay from 'razorpay';

const loadRazorpayScript = () => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("window is undefined"));
    if (window.Razorpay) return resolve(window.Razorpay);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(window.Razorpay);
    script.onerror = () => reject(new Error("Razorpay script failed to load"));
    document.body.appendChild(script);
  });
};

const PaymentInfo = ({ username, currProfileView }) => {
  const { data: session, status } = useSession();
  const [paymentForm, setPaymentForm] = useState({ message: "", amount: null });
  // const [currProfileView, setcurrProfileView] = useState({});
  const [currProfilePayments, setcurrProfilePayments] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    getPaymentData();
  }, [username]);

  useEffect(() => {
    if (searchParams.get("payment") === "success" && currProfilePayments.length > 0) {
      toast.success('Payment Successful', {
        theme: "dark",
        closeOnClick: true,
        draggable: true,
        transition: Bounce
      });
      router.push(`/profile/${username}`);
    }
  }, [currProfilePayments]);

  const getPaymentData = async () => {
    const payments = await fetchPaymentsToUser(username);
    setcurrProfilePayments(payments);
  }

  const handleChange = (e) => {
    setPaymentForm({
      ...paymentForm,
      [e.target.name]: e.target.value
    });
  }

  const handlePaymentSuggestionClick = (amount) => {
    // set the amount in the input field
    setPaymentForm({
      ...paymentForm,
      amount: amount
    });
  }

  if (status === "loading") {
    return <div>Loading...</div>
  }

  paymentForm.username = session?.user?.username || "guest";

  const pay = async (amount) => {
    // await createRazorpayOrder(50000, "INR", username);
    //get the order id 
    if (status === "unauthenticated") {
      toast.error(`Error: Please Sign in to make a payment`, {
        theme: "dark",
        closeOnClick: true,
        draggable: true,
        transition: Bounce
      });
      return;
    }
    let order = await createRazorpayOrder(amount, username, paymentForm);
    if (order.error) {
      toast.error(`Error: ${order.error.description ? order.error.description : order.error}`, {
        theme: "dark",
        closeOnClick: true,
        draggable: true,
        transition: Bounce
      });
      return;
    }
    let orderID = order?.id;

    try {
      await loadRazorpayScript();
    } catch (err) {
      console.error("Razorpay script load error", err);
      return;
    }

    var options = {
      "key": currProfileView.razorpayID, // Enter the Key ID generated from the Dashboard
      "amount": order?.amount || Number(amount) * 100, // Amount is in currency subunits. 
      "currency": "INR",
      "name": "Patrify", //your business name
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": orderID, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        "name": "Aman Kumar", //your customer's name
        "email": "amanmadan9801@gmail.com",
        "contact": "+919080754795" //Provide the customer's phone number for better conversion rates 
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  }

  return (
    <>
      <ToastContainer transition={Bounce} theme="dark" closeOnClick draggable />
      <div className="payment flex gap-5 w-3/4 flex-col md:flex-row">
        <div className="supporters w-full md:w-1/2 bg-(--bg-gradient-start) rounded-xl flex flex-col items-center py-5 gap-3">
          <h2 className='text-2xl font-bold'>Top Patrons</h2>
          <hr className='bg-white w-3/4' />
          <ul className='md:w-3/4 px-4 md:px-1 text-sm md:text-md'>
            {currProfilePayments.length === 0 && <div className='text-center text-xl text-neutral-400'>No payments yet. Be the first to support!</div>}
            {currProfilePayments.map((p, i) => {
              return (
                <li className='my-4 md:my-1 flex gap-2 items-center' key={i}>
                  <img width={30} height={30} src="/avatar.gif" alt="user avatar" className='' />
                  <span>{p.username} donated <b>₹{p.amount}</b> with a message "{p.message}"</span>
                </li>
              )
            })}
          </ul>

        </div>
        <div className="makePaymentBlock w-full md:w-1/2 bg-(--bg-gradient-start) rounded-xl flex flex-col items-center py-5 gap-3">
          <h2 className='text-2xl font-bold'>Make a Payment</h2>
          <hr className='bg-white w-3/4 mb-3' />
          <div className="makePayment flex flex-col w-3/4 gap-5">
            <div className="paymentForm flex flex-col gap-1 md:gap-2">
              <div >
                <input type="text" name='message' placeholder='Enter Message' className='rounded-xl w-full h-full mb-3 bg-slate-500 p-2 px-3 ring-1 ring-neutral-700' value={paymentForm.message} onChange={(e) => handleChange(e)} />
              </div>
              <div className='flex gap-1 md:gap-2'>
                <div className="w-3/4">
                  <input type="number" name='amount' placeholder='Enter Amount' className='rounded-xl w-full h-full mb-3 bg-slate-500 p-2 px-3 ring-1 ring-neutral-700' value={paymentForm.amount ? paymentForm.amount : ""} onChange={(e) => handleChange(e)} />
                </div>
                <button className='w-1/4 bg-slate-700 rounded-xl cursor-pointer hover:bg-slate-800 disabled:text-neutral-500 disabled:bg-slate-600 disabled:cursor-auto' disabled={paymentForm.message?.length < 2 || paymentForm.amount < 1} onClick={() => pay(paymentForm.amount)}>Pay</button>
              </div>
            </div>
            <div className="paymentChoose flex gap-2">
              <button className='w-1/4 bg-slate-700 rounded-xl py-3 cursor-pointer' onClick={() => handlePaymentSuggestionClick(100)}>₹100</button>
              <button className='w-1/4 bg-slate-700 rounded-xl py-3 cursor-pointer' onClick={() => handlePaymentSuggestionClick(200)}>₹200</button>
              <button className='w-1/4 bg-slate-700 rounded-xl py-3 cursor-pointer' onClick={() => handlePaymentSuggestionClick(500)}>₹500</button>
              <button className='w-1/4 bg-slate-700 rounded-xl py-3 cursor-pointer' onClick={() => handlePaymentSuggestionClick(1000)}>₹1000</button>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default PaymentInfo
