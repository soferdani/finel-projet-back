const express = require('express')
const router = express.Router()
const DBServices = require('../db/userTypeService')()

router.get('/usertype/:id?', async (req, res) => {
    const { id } = req.params
    const userType = await DBServices.getUserType(id)
    res.send(userType[0])
})


router.post('/usertype', async (req, res) => {
    const { type } = req.body
    const userType = await DBServices.addNewUserType(type)
    res.send(userType)
})


router.put('/usertype/:id', async (req, res) => {
    const { id } = req.params
    const { type } = req.body
    const userType = await DBServices.updateUserType(type, id)
    res.send(userType)
})


router.delete('/usertype/:id', async (req, res) => {
    const { id } = req.params
    const userType = await DBServices.deleteUserType(id)
    res.send(userType)
})





module.exports = router