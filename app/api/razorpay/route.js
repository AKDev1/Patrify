import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import User from "@/app/models/User";
import Payment from "@/app/models/Payment";
import connectDB from "@/app/db/connectDB";

export async function POST(request) {
  await connectDB();
  let body = await request.formData();
  body = Object.fromEntries(body);

  let p = await Payment.findOne({ orderID: body.razorpay_order_id });
  if(!p){
    return NextResponse.json({ error: "Payment not found" }, { status: 404 });
  }

  let user = await User.findOne({ username: p.toUser });
  
  if(!user.razorpaySecret || !user.razorpayID){
    return NextResponse.json({ error: "User Razorpay details not found" }, { status: 404 });
  }

  let verified = validatePaymentVerification({
    order_id: body.razorpay_order_id,
    payment_id: body.razorpay_payment_id,
  }, body.razorpay_signature, user.razorpaySecret);

  if (verified) {
    let updatedPayment = await Payment.findOneAndUpdate({orderID: body.razorpay_order_id}, {done: true}, {new: true});
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/profile/${updatedPayment.toUser}?payment=success`, 303)
  }
  else{
    return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
  }
}