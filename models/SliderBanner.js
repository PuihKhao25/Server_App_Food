const mongoose = require('mongoose')
const Schema =mongoose.Schema

const SlideBannerSchema = new Schema({
    img: {
        type: String,
        required: true,
        unique:true,
    },
    url: {
        type: String,
    },

    
})
module.exports = mongoose.model('slidebanner', SlideBannerSchema)