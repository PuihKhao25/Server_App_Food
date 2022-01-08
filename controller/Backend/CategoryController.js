const getCategory = (req, res) =>{
    res.render('admin/category', { title: 'Admin' });
}
module.exports = {
    getCategory
}