import mongoose from 'mongoose'

const citySchema = new mongoose.Schema({
    name: String,
    country_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'country'
    }
    
})

const City = mongoose.model('city', citySchema)

export default City