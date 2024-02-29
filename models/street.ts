import mongoose from 'mongoose'

const streetSchema = new mongoose.Schema({
    name: String,
    city_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'city'
    }
})

const Street = mongoose.model('street', streetSchema)

export default Street