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

const deleteCart = async(req, res) => {
    try {
		const DeleteCondition = { user: req.user.user_id }
		const deletedCart = await Cart.findOneAndUpdate(DeleteCondition,{
            $pull: {
                cartItems: {
                    product: req.params.id
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

const  getCart = async (req, res) => {
    await Cart.find({
        user: req.user.user_id
    })
    .populate("cartItems.product")
    .then(data => (
        res.json({
            status: 200,
            data
        })
    ))
    .catch(err => {
        return res.status(500).json({
            status: 500,
            message: err.message || 'same error'
        })
    })
}
module.exports = {

    addCart,
    deleteCart,
    getCart
  
    
}