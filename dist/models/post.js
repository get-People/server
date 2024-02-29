"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30,
        unique: true,
    },
    body: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 300,
    }
});
const Post = mongoose_1.default.model('post', postSchema);
exports.default = Post;
