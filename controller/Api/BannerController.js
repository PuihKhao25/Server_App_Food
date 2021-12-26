const Slidebanner = require('../../models/SliderBanner')

const getBanner = async(req, res) => {
    try {
        const banner = await Slidebanner.find()
        res.json(banner)
    } catch (error) {
        res.json({ message: 'get categories fail' })
    }

}
const addBanner = async(req, res) => {
    const { img, url } = req.body
    console.log(req.body)
    try {
        const newBanner = new Slidebanner({ img, url })
        await newBanner.save()
        return res.json({ success: true, message: 'Add banner oke' })
    } catch (error) {
        console.log(error)
        res
            .json({ success: false, message: 'server error' })
    }

}
module.exports = {
    getBanner,
    addBanner
}