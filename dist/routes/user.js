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
router.get("/check", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`https://${process.env.AUTH_ADDRESS}:${process.env.AUTH_PORT}/check`, {
            httpsAgent: new https_1.default.Agent({
                rejectUnauthorized: false
            })
        });
        res.status(200).send(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ errorMessage: "Failed to check authentication server" });
    }
}));
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(`https://${process.env.AUTH_ADDRESS}:${process.env.AUTH_PORT}/register`, req.body, {
            httpsAgent: new https_1.default.Agent({
                rejectUnauthorized: false
            })
        });
        res.status(200).send(response.data);
    }
    catch (error) {
        console.error(error);
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
        const response = yield axios_1.default.post(`https://${process.env.AUTH_ADDRESS}:${process.env.AUTH_PORT}/login`, req.body, {
            httpsAgent: new https_1.default.Agent({
                rejectUnauthorized: false
            })
        });
        res.status(200).send(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "login fail" });
    }
}));
router.get("/getAllUsers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_js_1.default.find({});
        res.status(200).send(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "something error when trying to get users" });
    }
}));
router.post("/specificUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName } = req.body;
        const user = yield user_js_1.default.findOne({
            "firstName": firstName,
            "lastName": lastName
        }).populate('address.country_id')
            .populate('address.city_id')
            .populate('address.street_id');
        res.status(200).send(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "error when trying to get user" });
    }
}));
router.put("/updateUser/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = req.params.id;
        if (typeof id === 'string') {
            id = sanitize_js_1.default.sanitize(id);
        }
        const { error } = userValidator_js_1.updateUserValidator.validate(req.body);
        if (error)
            return res.status(400).send(error.details[0].message);
        const updatedUser = yield user_js_1.default.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser)
            return res.status(404).send("something went wrong with the updating");
        res.status(200).send(updatedUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ errorMessage: "update fail" });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_js_1.default.findByIdAndDelete(req.params.id);
        if (!user)
            return res.status(400).send("the user with the given id was not found");
        res.status(200).send("deleting user successfully");
    }
    catch (error) {
        console.error(error);
        res.status(500).send("something went wrong when deleting");
    }
}));
exports.default = router;
