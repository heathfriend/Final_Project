const express = require('express')
const store = express.Router()
const Store = require('../models/store.js')

store.get('/', (req, res) => {
    Store.find({}, (err, foundStore) => {
        res.json(foundStore)
    })
})

store.post('/', (req, res) => {
    Store.create(req.body, (err, createdStore) => {
        Store.find({}, (err, foundStore) => {
            res.json(foundStore)
        })
    })
})

store.put('/:id', (req, res) => {
    Store.findByIdAndUpdate(req.params.id, req.body, {
        new: true}, (err, updatedStore) => {
            if (err) {
                res.send(err)
            } else {
                Store.find({}, (err, foundStore) => {
                    res.json(foundStore)
                })
            }
        }
     )
})



module.exports = store
