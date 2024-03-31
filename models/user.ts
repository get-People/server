import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        minLength: 15,
        maxLength: 35,
        trim: true,
        lowercase: true
    },
     password: {
        type: String,
        required: true,
        minLength: 4,
    }
})

const User = mongoose.model('user', userSchema)

export default User