const express = require('express')
const router = express.Router()
const DBServices = require('../db/employeeServices')()

router.get('/service/:id', async (req, res) => {
    const { id } = req.params
    const services = await DBServices.getEmployeesByProperty(id)
    res.send(services)
})

router.get('/useremployee/:managerId', async (req, res) => {
    const { managerId } = req.params
    const employees = await DBServices.getEmployeesByManager(managerId)
    res.send(employees)
})

router.post('/service', async (req, res) => {
    const service = req.body
    const id = await DBServices.saveEmployeeToProperty(service)
    res.send(id)
})

router.post('/useremployee', async (req, res) => {
    const { managerId, employeeId } = req.body
    let id = await DBServices.addNewEmployee(managerId,employeeId)
    res.send(id)
})

router.delete('/service/:propertyId/:userId', async (req, res) => {
    const { propertyId } = req.params
    const { userId } = req.params
    const deleted = await DBServices.removeEmployeeFromProperty(userId, propertyId)
    res.send(deleted)
})


router.delete('/useremployee/:managerId/:serviceWorkerId', async (req, res) => {
    const {managerId} = req.params
    const {serviceWorkerId} = req.params
    let id = await DBServices.deleteEmployee(managerId,serviceWorkerId)
    res.send({serviceWorkerId})
})

module.exports = router