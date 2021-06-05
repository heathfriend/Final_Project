const express = require('express')
const store = express.Router()

store.get('/', (req, res) => {
    res.send('index')
})


module.exports = store
