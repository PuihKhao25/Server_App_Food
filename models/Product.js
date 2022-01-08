const mongoose = require('mongoose')
const Schema =mongoose.Schema

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique:true,
    },
    img: {
        type: String,
        required:true,
        default:"https://cdn.tgdd.vn/Files/2021/08/31/1379261/top-10-loai-banh-ngot-ngon-noi-tieng-nhat-tren-the-gioi-202108311558118672.jpg"
    },
    category: {
        type: String,
        required:true
    },
    price: {
        type: Number ,
        required:true
    },
    description: {
        type: String,
        required: true,
    }, 
})
module.exports = mongoose.model('products', ProductSchema)