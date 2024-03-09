import mongoose from 'mongoose'
import Country from './country'
import City from './city'
import Street from './street'

const addressSchema = new mongoose.Schema({
    country_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'country',
        required: true,
    },
    city_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'city',
        required: true,
    },
    street_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'street',
        required: true,
    },
},{ _id: false })

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
    address: addressSchema,
    age: {
        type: Number,
        min: 18,
        max: 120,
        required: true,
    }
})

const User = mongoose.model('user', userSchema)

export default User