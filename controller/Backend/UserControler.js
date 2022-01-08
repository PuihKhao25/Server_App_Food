const User = require('../../models/User')

const getUser = async(req, res) => {
    try {
        const user = await User.find()
        console.log(user)
        res.render('admin/managerUser', { title: 'Admin', users: user});
    } catch (error) {
        res.json({ message: 'get ser fail' })
    }

}
const getHome = (req, res) => {
	res.render('admin/get-user', { title: 'Admin'});
}
const deleteUser = async(req, res) => {
	const userId = req.params.id 
	console.log(userId)
	if(!userId) return res.json("fail id user")
    try {
		
		const deletedUser = await User.findOneAndDelete({_id :userId})
		if (!deletedUser)
			res.redirect('/admin')
		else {
			res.redirect('/admin/get-user')
			
		}	
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
}

module.exports = {
    getUser,
    deleteUser,
	getHome
}