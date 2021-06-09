const mongoose = require('mongoose')

const storeSchema = new mongoose.Schema({
    item: String,
    image: {type: String, default: 'https://via.placeholder.com/150' },
    price: Number
})

const Store = mongoose.model('Store', storeSchema)



module.exports = Store
