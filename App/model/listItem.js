import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
    name: {
        type: String
    } 
})

export default mongoose.model('item', itemSchema)
