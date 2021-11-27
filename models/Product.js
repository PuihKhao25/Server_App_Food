const mongoose = require('mongoose')
const Schema =mongoose.Schema

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique:true,
    },
    description: {
        type: String,
        required: true,
    },
    avata: {
        type: String,
    },
    
})
module.exports = mongoose.model('product', ProductSchema)