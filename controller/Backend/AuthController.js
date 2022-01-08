
const getLogin = (req, res) => {
    res.render('login', { title: 'Login', layout : false });
}
module.exports = {
    getLogin
}