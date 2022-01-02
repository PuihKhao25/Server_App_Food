const mongoose = require('mongoose')
const Schema =mongoose.Schema

const CartSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    cartItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: true 
            },
            quantity: {
                type: Number,
                default: 1, 
            },
            price: {
                 type: Number,
                 required: true   
            },
            payment: {
                 type: Number,
                 required: true   
            }
        }
    ]
    
}, {timestamps: true})
module.exports = mongoose.model('carts', CartSchema)