const express = require('express')
const router = express.Router()
const DBServices = require('../db/propertyServices')()

router.get('/properties/:id', async (req, res) => {
    const { id } = req.params
    const properties = await DBServices.getProperties(id)
    res.send(properties)
})

router.post('/property', async (req, res) => {
    const property = req.body
    const id = await DBServices.saveProperty(property)
    res.send(id)
})

router.put('/property/:id', async (req, res) => {
    const { id } = req.params
    const property = req.body
    const saved = await DBServices.updateProperty(property, id)
    res.send(saved)
})

router.delete('/property/:id', async (req, res) => {
    const { id } = req.params
    const deleted = await DBServices.deleteProperty(id)
    res.send(deleted)
})

module.exports = router