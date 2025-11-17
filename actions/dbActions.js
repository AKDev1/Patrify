"use server"
import Razorpay from "razorpay";
import User from "@/app/models/User";
import Payment from "@/app/models/Payment";
import connectDB from "@/app/db/connectDB";

export async function createRazorpayOrder(amount, toUser, paymentForm) {
  await connectDB();
  const user = await User.findOne({ username: toUser });
  if (!user || !user.razorpayID || !user.razorpaySecret) {
    return { error: "Recipient Razorpay details not found" };
  }

  var instance = new Razorpay({ key_id: user.razorpayID, key_secret: user.razorpaySecret });

  let options = {
    amount: amount * 100,  // amount in the smallest currency unit
    currency: "INR",
  }

  let x = await instance.orders.create(options);
  //create a payment entry in db with status as pending
  if (x && x.id) await Payment.create({ orderID: x.id, amount: amount, toUser: toUser, message: paymentForm.message || "", username: paymentForm.username || "guest" });

  return x;
}

export const fetchUser = async (username) => {
  await connectDB();
  const user = await User.findOne({ username: username }).lean();
  if (user) return {
    ...user,
    _id: user._id.toString(),
    // never send secrets to client:
    razorpaySecret: undefined,
  };
}

export const fetchPaymentsToUser = async (toUser) => {
  await connectDB();
  //get payments where done is true in decreasing order of amount
  const payments = await Payment.find({ toUser: toUser, done: true }).sort({ amount: -1 }).limit(5).lean();
  return payments.map(p => ({
    ...p,
    _id: p._id.toString(),
    razorpaySecret: undefined,
  }));
}

export const fetchPayementsByUser = async (byUser) => {
  await connectDB();
  const payments = await Payment.find({ username: byUser, done: true }).lean();
  return payments.map(p => ({
    ...p,
    _id: p._id.toString(),
    razorpaySecret: undefined,
  }));
}

export const updateUser = async (username, updatedData) => {
  await connectDB();
  // let newUpdatedData = Object.fromEntries(updatedData);

  if (updatedData.username !== username) {
    let u = await User.findOne({ username: updatedData.username });
    if (u) {
      return { error: "Username already taken", success: false };
    }
    const updatedPayments = await Payment.updateMany({ toUser: username }, { toUser: updatedData.username });
    if (updatedPayments.modifiedCount === 0) {
      return { error: "Update unsuccessful", success: false };
    }
    // if ( > 0) {
    //   return { success: true };
    // }
    // return { error: "Update unsuccessful", success: false };
  }

  const updated = await User.updateOne({ email: updatedData.email }, { $set: updatedData });
  if (updated.modifiedCount > 0) {
    return { success: true };
  }
  await Payment.updateMany({ toUser: updatedData.username }, { toUser: username });
  return { error: "Update unsuccessful", success: false };
}