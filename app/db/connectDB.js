import mongoose, { isObjectIdOrHexString } from 'mongoose';

let isConnected = false;

const connectDB = async () => {
  if(isConnected) {
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: {conn.connection.host}`);
    isConnected = true;
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

export default connectDB;