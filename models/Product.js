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
        required:true
    },
    price: {
        type: Number ,
        required:true
    },
    address :{
        type:String, 
        required:true
    },
    voted :{
        type:String, 
        required:true
    },
    category: {
        type: String,
        ref: 'carts',
        required: true 
    }
    
})
module.exports = mongoose.model('products', ProductSchema)