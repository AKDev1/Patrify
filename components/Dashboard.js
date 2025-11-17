"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { fetchUser, updateUser } from '@/actions/dbActions';
import { Bounce, ToastContainer, toast } from 'react-toastify';

const Dashboard = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [form, setform] = useState({});

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/login');
    }
    else getUserData();
  }, [status, router]);

  const getUserData = async () => {
    const userData = await fetchUser(session?.user.username);
    if (userData) setform(userData);
  }

  const handleFormChange = (e) => {
    // setform({ ...form, [e.target.name]: e.target.value });
    const { name, value } = e.target;
    setform(prev => {
      const copy = { ...prev };

      if (value === "" || value === null || value === undefined) {
        delete copy[name];
      } else {
        copy[name] = value;
      }

      return copy;
    });
  };

  const handleSubmit = async () => {
    //update user details
    const updated = await updateUser(session.user.username, form);
    if (updated.error) {
      toast.error(`Error: ${updated.error}`, {
        theme: "dark",
        closeOnClick: true,
        draggable: true,
        transition: Bounce
      });
      return;
    }
    toast.success(`Profile successfully updated!`, {
      theme: "dark",
      closeOnClick: true,
      draggable: true,
      transition: Bounce
    });
    if(updated.success && (form.username && form.username !== session.user.username)) setTimeout(() => {
      update({ username: form.username }).catch(console.error);
    }, 1000);
      
  }

  if (status === "loading") {
    return (<div>
      loading...
    </div>);
  }

  return (
    <>
      <ToastContainer transition={Bounce} theme="dark" closeOnClick draggable/>
      <div className='container mx-auto p-5 w-1/2'>
        <h1 className='text-4xl font-bold mb-3'>Dashboard</h1>
        <hr className='bg-white w-full' />
        <div className="py-4">
          <form action={handleSubmit}>
            <div className="input flex flex-col gap-1 h-full py-1">
              <label htmlFor="name" className='text-md font-black w-1/4'>Name:</label>
              <input type="text" value={form.name ? form.name : ""} onChange={(e) => handleFormChange(e)} placeholder='Enter Name' name="name" className='rounded-xl w-full h-full bg-slate-500 p-4 px-3 ring-1 ring-neutral-700' />
            </div>
            <div className="input flex flex-col gap-1 h-full py-1">
              <label htmlFor="email" className='text-md font-black w-1/4'>Email:</label>
              <input type="email" value={form.email ? form.email : ""} onChange={(e) => handleFormChange(e)} placeholder='Enter Email' name="email" className='rounded-xl w-full h-full bg-slate-500 p-4 px-3 ring-1 ring-neutral-700' />
            </div>
            <div className="input flex flex-col gap-1 h-full py-1">
              <label htmlFor="username" className='text-md font-black w-1/4'>Username:</label>
              <input type="text" value={form.username ? form.username : ""} onChange={(e) => handleFormChange(e)} placeholder='Enter Username' name="username" className='rounded-xl w-full h-full bg-slate-500 p-4 px-3 ring-1 ring-neutral-700' />
            </div>
            <div className="input flex flex-col gap-1 h-full py-1">
              <label htmlFor="profilePic" className='text-md font-black w-1/4'>Profile Pic:</label>
              <input type="text" value={form.profilePic ? form.profilePic : ""} onChange={(e) => handleFormChange(e)} placeholder='Enter Profile Pic URL' name="profilePic" className='rounded-xl w-full h-full bg-slate-500 p-4 px-3 ring-1 ring-neutral-700' />
            </div>
            <div className="input flex flex-col gap-1 h-full py-1">
              <label htmlFor="coverPic" className='text-md font-black w-1/4'>Cover Pic:</label>
              <input type="text" value={form.coverPic ? form.coverPic : ""} onChange={(e) => handleFormChange(e)} placeholder='Enter Cover Pic URL' name="coverPic" className='rounded-xl w-full h-full bg-slate-500 p-4 px-3 ring-1 ring-neutral-700' />
            </div>
            <div className="input flex flex-col gap-1 h-full py-1">
              <label htmlFor="razorpayID" className='text-md font-black w-1/4'>Razorpay ID:</label>
              <input type="text" value={form.razorpayID ? form.razorpayID : ""} onChange={(e) => handleFormChange(e)} placeholder='Enter RazorPay ID' name="razorpayID" className='rounded-xl w-full h-full bg-slate-500 p-4 px-3 ring-1 ring-neutral-700' />
            </div>
            <div className="input flex flex-col gap-1 h-full py-1">
              <label htmlFor="razorpaySecret" className='text-md font-black w-1/4'>Razorpay Secret:</label>
              <input type="text" value={form.razorpaySecret ? form.razorpaySecret : ""} onChange={(e) => handleFormChange(e)} placeholder='Enter RazorPay Secret' name="razorpaySecret" className='rounded-xl w-full h-full bg-slate-500 p-4 px-3 ring-1 ring-neutral-700' />
            </div>
            <div className="flex justify-center">

              <button type='submit' className='bg-blue-600 text-white px-5 py-3 rounded-xl mt-5 w-full cursor-pointer hover:bg-blue-700'>Save Profile</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Dashboard