"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPostValidation = exports.updatePostValidation = exports.createPostValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createPostValidation = joi_1.default.object({
    title: joi_1.default.string().min(3).max(30).required(),
    body: joi_1.default.string().min(3).max(300).required()
});
exports.updatePostValidation = joi_1.default.object({
    title: joi_1.default.string().min(3).max(30).optional(),
    body: joi_1.default.string().min(3).max(300).optional()
});
exports.checkPostValidation = joi_1.default.object({
    title: joi_1.default.string().min(3).max(30).required()
});
