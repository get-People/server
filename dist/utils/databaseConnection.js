"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDatabase = () => {
    const mongoURL = 'mongodb+srv://israelmark:r0zWjecE1Ejkyt97@cluster0.iizwmp1.mongodb.net/?retryWrites=true&w=majority';
    mongoose_1.default
        .connect(mongoURL)
        .then(() => console.log("connected to mongoDB"))
        .catch((err) => console.error("error connecting to mongoDB", err));
};
exports.default = connectToDatabase;
