const argan2 = require('argon2')
const jwt = require('jsonwebtoken')

const User = require('../../models/User')


const logout = (req, res) => {
    try {
        if (req.cookies.access_token)
        // console.log(`${}`)  
            return res
            .clearCookie("access_token")
            .status(200)
            .json({ success: true, message: 'Logout Successful' });
    } catch (error) {
        return res
            .json({ success: false, message: 'Error Server' });
    }

}
const login = async(req, res) => {
    const { email, password } = req.body

    if (!email || !password)
        return res.json({ success: false, message: 'missing email or password' })
    try {
        const user = await User.findOne({ email })
        if (!user)
            return res.json({ success: false, message: 'Email or password already exists' })
        const passwordValid = await argan2.verify(user.password, password)
        if (!passwordValid)
            return res.json({ success: false, message: 'Email or password already exists' })

        const accessToken = jwt.sign({ user_id: user.email }, process.env.ACCESS_TOKEN)

        res
            .cookie('access_token', accessToken, { maxAge: 900000, httpOnly: true })
            .json({
                success: true,
                message: 'login successfully',
                token: accessToken,
                data: user
            })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'server error' })
    }
}

const register = async(req, res) => {

    const { username, email, password } = req.body
    console.log(req.body)

    if (!email || !password)
        return res
            .json({ success: false, message: 'missing email or password' })
    try {
        // check for user
        const user = await User.findOne({ email })
        if (user)
            return res
                .json({ success: false, message: 'Email already exists' })
        const hashedPassword = await argan2.hash(password)
        const newUser = new User({ username, email, password: hashedPassword })
        await newUser.save()

        const accessToken = jwt.sign({ user_id: newUser._id }, process.env.ACCESS_TOKEN)
        res
            .cookie('access_token', accessToken, { maxAge: 900000, httpOnly: true })
            .json({
                success: true,
                message: 'created successfully',
                token: accessToken,
                data: newUser
            })
    } catch (error) {
        console.log(error)
        res
            .json({ success: false, message: 'server error' })
    }
}
module.exports = {
    register,
    login,
    logout
}