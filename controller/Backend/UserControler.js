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

const deleteUser = async(req, res) => {
	const userId = req.params.id 
	if(!userId) return res.json("fail id user")
    try {
		
		const deletedUser = await User.findOneAndDelete({_id :userId})
		if (!deletedUser)
			res.render('admin/get-user', { title: 'Admin'});
		else {
			res.render('admin/', { title: 'Admin'});
			
		}	
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
}

module.exports = {
    getUser,
    deleteUser,
}