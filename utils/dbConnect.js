import mongoose from "mongoose";

const config = {
  isConnected: 0,
};

export const dbConnect = async () => {
  if (config.isConnected) {
    return;
  }

  try {
    const { connection } = await mongoose.connect(process.env.MONGO_DB_URL);

    console.log("db connected...");
    console.log(connection.readyState);
    config.isConnected = connection.readyState;

    //testing and ceating new user

 
    console.log("connected with host ", connection.host);
  } catch (error) {
    console.log("failed  to connect with database");
    console.log(error);
  }
};