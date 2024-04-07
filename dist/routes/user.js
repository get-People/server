"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const user_js_1 = __importDefault(require("../models/user.js"));
const sanitize_js_1 = __importDefault(require("../utils/sanitize.js"));
const userValidator_js_1 = require("../validation/userValidator.js");
const axios_1 = __importDefault(require("axios"));
const https_1 = __importDefault(require("https"));
const auth_js_1 = require("../utils/auth.js");
const axiosInstance = axios_1.default.create({
    baseURL: `https://${process.env.AUTH_ADDRESS}:${process.env.AUTH_PORT}`,
    httpsAgent: new https_1.default.Agent({
        rejectUnauthorized: false
    }),
    withCredentials: true
});
router.post("/forgot-password", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("/forgot-password");
        const mainServerUrl = `https://${process.env.ADDRESS}:${process.env.PORT}/api/users`;
        req.body.mainServerUrl = mainServerUrl;
        const response = yield axiosInstance.post("/forgot-password", req.body);
        res.status(200).send(response.data);
    }
    catch (err) {
        console.error(err);
        if (err.response) {
            res.status(err.response.status).send(err.response.data);
        }
        else {
            res.status(500).send({ errorMessage: "Failed to request password reset" });
        }
    }
}));
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axiosInstance.post('/register', req.body);
        const cookieHeader = response.headers['set-cookie'];
        if (cookieHeader) {
            res.set('Set-Cookie', cookieHeader);
        }
        res.status(201).send(response.data);
    }
    catch (error) {
        if (error.response) {
            res.status(error.response.status).send(error.response.data);
        }
        else {
            res.status(500).send({ errorMessage: "Failed to register user on authentication server" });
        }
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axiosInstance.post('/login', req.body);
        const cookieHeader = response.headers['set-cookie'];
        if (cookieHeader) {
            res.set('Set-Cookie', cookieHeader);
        }
        res.status(200).send(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: error.response.data.message });
    }
}));
router.get("/getAllUsers", auth_js_1.verifyToken, auth_js_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_js_1.default.find({});
        res.status(200).send(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "something error when trying to get users" });
    }
}));
router.post("/specificUser", auth_js_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield user_js_1.default.findOne({
            "email": email,
        });
        res.status(200).send(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "error when trying to get user" });
    }
}));
router.put("/updateUser/:email", auth_js_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let email = req.params.email;
        if (typeof email === 'string') {
            email = sanitize_js_1.default.sanitize(email);
        }
        console.log("updateUser");
        const { error } = userValidator_js_1.updateUserValidator.validate(req.body);
        if (error)
            return res.status(400).send(error.details[0].message);
        const updatedUser = yield user_js_1.default.findOneAndUpdate({ email }, req.body, { new: true });
        if (!updatedUser)
            return res.status(404).send("something went wrong with the updating");
        // if (typeof isAdmin === 'boolean') {
        //   return res.status(403).send({message: "you are not allowed to change the isAdmin field"})
        // }
        res.status(200).send(updatedUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ errorMessage: "update fail" });
    }
}));
router.delete("/:email", auth_js_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = sanitize_js_1.default.sanitize(req.params.email);
        const user = yield user_js_1.default.findOneAndDelete({ email });
        if (!user)
            return res.status(400).send("the user with the given email was not found");
        res.status(200).send("deleting user successfully");
    }
    catch (error) {
        console.error(error);
        res.status(500).send("something went wrong when deleting");
    }
}));
exports.default = router;
//# sourceMappingURL=user.js.map