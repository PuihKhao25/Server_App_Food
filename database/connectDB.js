
const mongoose = require('mongoose')
const url = 'mongodb+srv://sang123:sang123@app-food.iebfa.mongodb.net/app-food?retryWrites=true&w=majority'
const  connectDB = async () => {
  try {
    await mongoose.connect(url, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("mongodb connected")
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
module.exports = connectDB
