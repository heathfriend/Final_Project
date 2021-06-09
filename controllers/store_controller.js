const express = require('express')
const store = express.Router()
const Store = require('../models/store.js')
const storeSeed = require('../models/store_seed.js')



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

store.get('/seed', (req, res) => {
    Store.insertMany(storeSeed, (err, manyStore) => {
        res.redirect('/store')
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


store.delete('/:id', (req, res) => {
    Store.findByIdAndRemove(req.params.id, (err, deletedStore) => {
        Store.find({}, (err, foundStore) => {
            res.json(foundStore)
        })
    })
})

module.exports = store
