import mongoose from 'mongoose'

const countrySchema = new mongoose.Schema({
    name: String,
})

const Country = mongoose.model('country', countrySchema)

export default Country