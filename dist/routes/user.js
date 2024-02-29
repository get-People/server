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
router.post("/createUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        Object.keys(req.body).forEach(key => {
            if ((typeof req.body[key] === 'object')) {
                console.log(req.body[key]);
                Object.keys(req.body[key]).forEach(item => {
                    item = sanitize_js_1.default.sanitize(item);
                });
            }
            else {
                req.body[key] = sanitize_js_1.default.sanitize(req.body[key]);
            }
        });
        const { error } = userValidator_js_1.createUserValidator.validate(req.body);
        if (error)
            return res.status(400).send(error.details[0].message);
        const newUser = yield user_js_1.default.create(req.body);
        res.status(200).send(newUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ errorMessage: "create fail" });
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
router.put("/updateUser:/id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (typeof req.params.id === 'string') {
            req.params.id = sanitize_js_1.default.sanitize(req.params.id);
        }
        const { error } = userValidator_js_1.updateUserValidator.validate(req.params.id);
        if (error)
            return res.status(400).send(error.details[0].message);
        const updatedUser = yield user_js_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
