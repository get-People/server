import express from "express";
import users from "./routes/users.js";
import posts from "./routes/posts.js";
import cors from "cors";
import https from "https";
import fs from "fs";
import connectToDatabase from "./utils/databaseConnection.js";


const privateKey = fs.readFileSync("./security/privatekey.pem");
const certificate = fs.readFileSync("./security/certificate.pem");

connectToDatabase();

const app = express();
const credentials = {
  key: privateKey,
  cert: certificate,
};

app.use(cors());
app.use(express.json());
app.use("/api/users", users);
app.use("/api/posts", posts);

const port = 7770;
const address = "localhost";

const server = https.createServer(credentials, app);
server.listen(port, address, () => {
  console.log(`Server is listening on port - ${port}`);
});
