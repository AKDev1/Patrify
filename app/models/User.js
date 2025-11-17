import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  name: {type: String},
  username: {type: String, required: true, unique: true},
  profilePic: {type: String, default: ""},
  coverPic: {type: String, default: ""},
  razorpayID: {type: String, default: ""},
  razorpaySecret: {type: String, default: ""},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
})

export default mongoose.models.User || mongoose.model("User", UserSchema);