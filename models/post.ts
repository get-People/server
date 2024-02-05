import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: "string",
        required: true,
        minLength: 3,
        maxLength: 30
    }
    
})