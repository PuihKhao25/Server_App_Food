const Product = require('../models/Product')

const getProducts = async (req, res) =>{
    try {
        const products = await Product.find()
        res.json(products)
    } catch (error) {
        res.json({message: 'get product fail'})
    }

}

const addProducts = async(req, res) =>{
    const {name, description, avata} = req.body
    console.log(req.body)
    if (!name)
        return res
        .json({success: false, message: 'name already exist'})
    try {
        const  name_product = await Product.findOne({name})
        if(name_product)
            return res.json({success: false, message: 'Ad product fail'})
        const newProduct = new Product({name, description, avata})
        await newProduct.save()
        return res.json({success: true, message: 'Add product oke'})
    } catch (error) {
    console.log(error)
      res
      .json({success: false, message:'server error'})
    }
    
}

module.exports = {
    addProducts,
    getProducts
}