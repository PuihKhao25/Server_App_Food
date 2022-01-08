var regexp = require('regexp')
const Product = require('../../models/Product')

const postKey = async(req, res) => {
    const { key } = req.body
    if(!key) return res.json('key error')
    try {
        const SearchProduct = await Product.find({ name: { $regex: key, $options: '$i' } })
        //const  SearchProduct =  await Product.find({ key})
        return res.json({product: SearchProduct })
    } catch (error) {
        return res.json('server await')
    }
       
    
    
    

}
module.exports = {
    postKey
}