const Cart = require('../../models/Carts')
const mongoose = require('mongoose');
const addCart = (req, res) =>{
    
    Cart.findOne({ user: req.user.user_id }).exec((error, cart) =>{
        if(error) return res.json({error})
        if(cart){  
            req.body.cartItems.forEach((cartItems) => {
                const product = cartItems.product
                const item = cart.cartItems.find((c) => c.product == product)
                if(item){
                    Cart.findOneAndUpdate({user : req.user.user_id, "cartItems.product": product},{
                        "$set" : {
                            "cartItems": {
                                ...cartItems,
                                quantity: item.quantity + cartItems.quantity
                            }
                        }
                    })
                    .exec((error, cart) => {
                        if(error) return res.json({ success: false, message: 'server error' })
                        if(cart){
                            return res.json({cart})
                        }
                    })
                }else{
                    Cart.findOneAndUpdate({user : req.user.user_id},{
                        "$push" : {
                            "cartItems": cartItems
                        }
                    })
                    .exec((error, cart) => {
                        if(error) return res.json({error})
                        if(cart){
                            return res.json({cart})
                        }
                    })
                }
            })   
        }else{
            console.log('hello')
            const cart = new Cart({
                user: req.user.user_id,
                cartItems: req.body.cartItems
            })
            cart.save((error, cart) =>{
                if(error) return res.json({error})
                if(cart){
                    return res.json({cart})
                }
            })   
        }
    })
}
const removeCartItems = async(req, res) => {
    try {
		const DeleteCondition = { user: req.user.user_id }
		const deletedCart = await Cart.findOneAndUpdate(DeleteCondition,{
            $pull: {
                cartItems: {
                    product: req.body.ProductId
                },
            }
        })
		if (!deletedCart)
			return res.status(401).json({
				success: false,
				message: 'Post not found or user not authorised'
			})

		res.json({ success: true, post: deletedCart })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

const getCart = async(req, res) => {
    try {
        const products = await Cart.find()
        res.json(products)
    } catch (error) {
        res.json({ message: 'get cart fail' })
    }

}
module.exports = {

    addCart,
    getCart,
    removeCartItems
  
    
}