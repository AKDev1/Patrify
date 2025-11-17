import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  username: {type: String, required: true},
  toUser: {type: String, required: true},
  orderID: {type: String, required: true},
  message: {type: String, default: ""},
  amount: {type: Number, required: true},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  done: {type: Boolean, default: false},
}); 

export default mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);