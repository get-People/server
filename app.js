import express from 'express'
import users from './routes/userRouter.js'
import customers from "./routes/postsRouter.js";

const app = express();
const port = 7770



app.use("/api/user", users);
app.use("/api/bank", customers);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});