const Product = require('../../models/Product')

const addProducts = async(req, res) => {
    const { 
        name, 
        description, 
        avata,
        price,
        address,
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
        const newProduct = new Product({ name, description, avata, price, address, voted })
        await newProduct.save()
        return res.json({ success: true, message: 'Add product oke' })
    } catch (error) {
        console.log(error)
        res
            .json({ success: false, message: 'server error' })
    }

}
const getProducts = async(req, res) => {
    var itemCategory = req.body.category
    console.log(itemCategory)
    try {

        if(itemCategory  === "all"){
            const products = await Product.find()
            console.log("hello")
            res.json(products)
        }else{
           
            const products = await Product.find(itemCategory)
            res.json(products)
        }
        
    } catch (error) {
        res.json({ message: 'get product fail' })
    }

}

const deleteProduct = async(req, res) => {
    try {
		const DeleteCondition = { _id: req.params.id }
		const deletedProduct = await Product.findOneAndDelete(DeleteCondition)

		// User not authorised or post not found
		if (!deletedProduct)
			return res.status(401).json({
				success: false,
				message: 'Post not found or user not authorised'
			})

		res.json({ success: true, post: deletedProduct })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
}
module.exports = {
    addProducts,
    getProducts,
    deleteProduct,
}