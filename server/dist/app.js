"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const https_1 = __importDefault(require("https"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const databaseConnection_js_1 = __importDefault(require("./utils/databaseConnection.js"));
const user_1 = __importDefault(require("./routes/user"));
const post_1 = __importDefault(require("./routes/post"));
const country_1 = __importDefault(require("./routes/country"));
const city_1 = __importDefault(require("./routes/city"));
const street_1 = __importDefault(require("./routes/street"));
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
app.use("/api/users", user_1.default);
app.use("/api/posts", post_1.default);
app.use('/api/country', country_1.default);
app.use('/api/city', city_1.default);
app.use('/api/street', street_1.default);
const server = https_1.default.createServer(credentials, app);
server.listen(parseInt(process.env.PORT, 10), process.env.ADDRESS, () => {
    console.log(`Server is listening on port - ${process.env.PORT}`);
});