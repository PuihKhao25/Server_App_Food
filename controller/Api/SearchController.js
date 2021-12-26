var regexp = require('regexp')
const Product = require('../../models/Product')

const postKey = async(req, res) => {
    const { key } = req.body
    console.log(key)
    try {
        const SearchProduct = await Product.find({ name: { $regex: key, $options: '$i' } })
            //const  SearchProduct =  await Product.find({ key})
        return res.json(SearchProduct)
    } catch (error) {
        console.log(error)
    }

}
module.exports = {
    postKey
}