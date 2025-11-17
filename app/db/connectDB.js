import mongoose, { isObjectIdOrHexString } from 'mongoose';

let isConnected = false;

const connectDB = async () => {
  if(isConnected) {
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_CONNECT_URL, {
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