"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const citySchema = new mongoose_1.default.Schema({
    name: String,
    country_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'country'
    }
});
const City = mongoose_1.default.model('city', citySchema);
exports.default = City;
