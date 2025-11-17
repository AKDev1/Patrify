import mongoose, { isObjectIdOrHexString } from 'mongoose';

let isConnected = false;

const connectDB = async () => {
  if(isConnected) {
    return;
  }

  try {
    const conn = await mongoose.connect(`mongodb+srv://akdev_user:akdev_password@akdev.pnuivao.mongodb.net/patrify?retryWrites=true&appName=AKDEV`, {
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