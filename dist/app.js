"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_js_1 = __importDefault(require("./routes/users.js"));
const posts_js_1 = __importDefault(require("./routes/posts.js"));
const cors_1 = __importDefault(require("cors"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const databaseConnection_js_1 = __importDefault(require("./utils/databaseConnection.js"));
const privateKey = fs_1.default.readFileSync("./security/privatekey.pem");
const certificate = fs_1.default.readFileSync("./security/certificate.pem");
(0, databaseConnection_js_1.default)();
const app = (0, express_1.default)();
const credentials = {
    key: privateKey,
    cert: certificate,
};
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/users", users_js_1.default);
app.use("/api/posts", posts_js_1.default);
const port = 7770;
const address = "localhost";
const server = https_1.default.createServer(credentials, app);
server.listen(port, address, () => {
    console.log(`Server is listening on port - ${port}`);
});
