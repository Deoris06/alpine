const mongoose = require('mongoose')


const connectDB = () => {
mongoose.connect(process.env.DB_CLOUD)
.then(() => console.log('CONNECTED TO DB'))
.catch(err => console.log(err))
}

module.exports = connectDB;