const express = require('express')
const router = express.Router()
const DBServices = require('../db/serviceServices')()

router.get('/service/:id', async (req, res) => {
    const { id } = req.params
    const services = await DBServices.getService(id)
    res.send(services)

})

router.post('/service', async (req, res) => {
    const service = req.body
    const id = await DBServices.saveService(service)
    res.send(id)
})

router.post('/service-create', async (req, res) => {
    const service = req.body
    const id = await DBServices.saveAndCreateService(service)
    res.send(id)
})

router.put('/service/:id', async (req, res) => {
    const { id } = req.params
    const service = req.body
    const saved = await DBServices.updateService(service, id)
    res.send(saved)
})

router.delete('/service/:propertyId/:userId', async (req, res) => {
    const { propertyId } = req.params
    const { userId } = req.params
    const deleted = await DBServices.deleteService(userId, propertyId)
    res.send(deleted)
})

module.exports = router