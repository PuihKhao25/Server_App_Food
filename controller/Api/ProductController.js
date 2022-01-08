const Product = require('../../models/Product')
const Category = require('../../models/Category')

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
    const idCategory = req.params.id
    console.log(idCategory)
    if(!idCategory)
        return res
            .json({ success: false, message: 'name already exist' })
    try {

        if(idCategory  == 1){
            const products = await Product.find()
            res.json(products)
        }
        else{
            Category.findById(idCategory)
            .exec((error, category) => {
                if(error) return res.json({ success: false, message: 'query cart to data fail' })
                if(category){
                    const nameCategory = category.name
                    Product.find({category: nameCategory}).exec((error, product)=> {
                        if(error) return res.json({ success: false, message: 'query cart to data fail' })
                        if(product){
                            return res.json(product)
                        }  
                    })
                }
            })       
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