import express from "express";
import https from "https";
import cors from "cors";
import fs from "fs";
import connectToDatabase from "./utils/databaseConnection.js";
import user from "./routes/user";
import post from "./routes/post";
import country from "./routes/country";
import city from "./routes/city";
import street from "./routes/street";

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
app.use("/api/users", user);
app.use("/api/posts", post);
app.use('/api/country', country)
app.use('/api/city', city)
app.use('/api/street', street)

const server = https.createServer(credentials, app);

server.listen(parseInt(process.env.PORT as string, 10),process.env.ADDRESS as string ,() => {
  console.log(`Server is listening on port - ${process.env.PORT}`);
});
