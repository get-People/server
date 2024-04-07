"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function extractAccessToken(req) {
    if (req.headers.cookie) {
        const cookiesParts = req.headers.cookie.split(';');
        const accessTokenPart = cookiesParts.find(cookie => {
            const [name, value] = cookie.trim().split('=');
            if (name === 'access token')
                return value;
        });
        if (accessTokenPart) {
            const [, accessToken] = accessTokenPart.trim().split('=');
            return accessToken;
        }
    }
    return null;
}
const verifyToken = (req, res, next) => {
    console.log("verify");
    if (req.headers.cookie) {
        const token = extractAccessToken(req);
        if (!token)
            return res.status(401).send({ message: "no token provided" });
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN);
            req.body.user = decodedToken;
            console.log(decodedToken);
            return next();
        }
        catch (error) {
            return res.status(401).send({ message: "Unauthorized" });
        }
    }
    return res.status(401).send({ message: "Unauthorized" });
};
exports.verifyToken = verifyToken;
const isAdmin = (req, res, next) => {
    console.log("admin");
    console.log(req.body.user);
    if (req.body.user.isAdmin)
        return next();
    return res.status(401).send({ message: "forbidden" });
};
exports.isAdmin = isAdmin;
//# sourceMappingURL=auth.js.map