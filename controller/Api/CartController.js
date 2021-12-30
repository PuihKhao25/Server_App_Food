const Cart = require('../../models/Carts')
const User = require('../../models/User')
const Product = require('../../models/Product')
const mongoose = require('mongoose');

const addCart = (req, res) =>{
    const userId = req.user.user_id
    if (!userId)
        return res
            .json({ success: false, message: 'name already exist' })
    try {
        const user = User.findOne(userId)
        if(user){
            Cart.findOne({userId}).exec((error, cart) =>{
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
        
    } catch (error) {
        return res
            .json({ success: false, message: 'server error' })
        
    }
  
    
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

const getMyCart = async(req, res) => {
    const cartId = req.body.CartId
    if (!cartId){
         return res
            .json({ success: false, message: 'cartID already exist' })

    }else{
        Cart.findOne({cartId})
            .exec((error, cart) => {
                if(error) return res.json({error})
                if(cart){
                    const product = cart.cartItems
                    return res.json({product})
                }

            })
    }
    

}
const getProduct = async(req, res) => {
    const ProductId = req.body
    console.log(ProductId)
    if (!ProductId){
         return res
            .json({ success: false, message: 'cartID already exist' })

    }else{
        Product.findOne({ProductId})
            .exec((error, product) => {
                if(error) return res.json({error})
                if(product){
                    return res.json({product})
                }

            })
    }

}
module.exports = {

    addCart,
    removeCartItems,
    getMyCart,
    getProduct
  
    
}