import express from "express";
import users from "./routes/userRouter.js";
import posts from "./routes/postsRouter.js";
import cors from 'cors'

const app = express();
const port = 7770;

app.use(cors())
app.use(express.json())
app.use("/api/users", users);
app.use("/api/posts", posts);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
