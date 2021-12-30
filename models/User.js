const mongoose = require('mongoose')
const Schema =mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique:true,
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        default: 1
    },
    cart_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    
})
module.exports = mongoose.model('users', UserSchema)