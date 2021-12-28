const Category = require('../../models/Category')

const getCategory = async(req, res) => {
    try {
        const categories = await Category.find()
        res.json(categories)
    } catch (error) {
        res.json({ message: 'get categories fail' })
    }

}
const deleteCategory = async(req, res) => {
    const id =req.body
    console.log(id)
    try {
        const categories = await Category.findByIdAndDelete(id)
    } catch (error) {
        res.json({ message: 'get categories fail' })
    }

}
const addCategory = async(req, res) => {
    const { name, avata } = req.body
    console.log(req.body)
    if (!name)
        return res
            .json({ success: false, message: 'name already exist' })
    try {
        const name_category = await Category.findOne({ name })
        if (name_category)
            return res.json({ success: false, message: 'Ad category fail' })
        const newCategory = new Category({ name, avata })
        await newCategory.save()
        return res.json({ success: true, message: 'Add category oke' })
    } catch (error) {
        console.log(error)
        res
            .json({ success: false, message: 'server error' })
    }

}
module.exports = {
    addCategory,
    getCategory,
    deleteCategory
}