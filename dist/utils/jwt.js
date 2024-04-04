"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    var _a, _b;
    if (req.headers.cookie) {
        const token = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.cookie) === null || _b === void 0 ? void 0 : _b.split('=')[1];
        if (!token)
            return res.status(401).send({ message: "no token provided" });
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN);
            req.body.user = decodedToken;
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
    if (req.body.user.isAdmin)
        return next();
    return res.status(401).send({ message: "forbidden" });
};
exports.isAdmin = isAdmin;
