import mongoose from "mongoose"; 

const connectToDatabase = () => {
  const mongoURL = 'mongodb+srv://israelmark:r0zWjecE1Ejkyt97@cluster0.iizwmp1.mongodb.net/?retryWrites=true&w=majority';
mongoose
  .connect(mongoURL)
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.error("error connecting to mongoDB", err));
}

export default connectToDatabase