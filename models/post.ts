import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

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

})

const Post = mongoose.model('post', postSchema);

export default Post