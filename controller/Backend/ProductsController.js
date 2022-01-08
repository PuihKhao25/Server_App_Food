const Product = require('../../models/Product')

const addProducts = async(req, res) => {
    const { 
        name,
        img,
        description, 
        category,
        price,
        voted
    } = req.body
    console.log(req.body)
    if (!name)
        return res
        .json({ success: false, message: 'name already exist' })
    try {
        const name_product = await Product.findOne({ name })
        if (name_product)
            return res.json({ success: false, message: 'Ad product fail' })
        const newProduct = new Product({ name, description, price,category })
        await newProduct.save()
        return res.json({ success: true, message: 'Add product oke' })
    } catch (error) {
        console.log(error)
        res
            .render('admin/addProduct', { title: 'Admin' });
    }
}
const getAddProducts = (req, res) => {
    res.render('admin/addProduct', { title: 'Admin' });

}
const getProducts = async(req, res) => {
    try {
        const products = await Product.find()
        console.log(products)
        res.render('admin/listProduct', { title: 'Admin', danhsach:products});
    } catch (error) {
        res.json({ message: 'get product fail' })
    }

}
const getEditProducts = (req, res) =>{
    res.render('admin/editProduct', { title: 'Admin'});
}
const postEditProducts = (req, res) =>{

}
module.exports = {
    getProducts,
    addProducts,
    getAddProducts,
    getEditProducts,
    postEditProducts
}