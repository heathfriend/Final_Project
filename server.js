// DEPENDENCIES
const express = require('express')

// CONFIGURATION
const app = express()
require('dotenv').config()
const PORT = process.env.PORT

const storeController = require('./controllers/store_controller.js')
app.use('/store', storeController)

// LISTENER
app.listen(PORT, () => {
  console.log('listening on port', PORT)
})
