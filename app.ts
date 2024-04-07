import express from "express";
import https from "https";
import cors from "cors";
import fs from "fs";
import connectToDatabase from "./utils/databaseConnection.js";
import user from "./routes/user.js";

const privateKey = fs.readFileSync("./security/privatekey.pem");
const certificate = fs.readFileSync("./security/certificate.pem");

connectToDatabase();

const app = express();
const credentials = {
  key: privateKey,
  cert: certificate,
};

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use("/api/users", user);


const server = https.createServer(credentials, app);

server.listen(parseInt(process.env.PORT as string, 10),process.env.ADDRESS as string ,() => {
  console.log(`Server is listening on port - ${process.env.PORT}`);
});
