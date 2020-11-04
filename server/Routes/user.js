const express = require('express')
const router = express.Router()
const DBServices = require('../db/userServices')()

router.get('/user/:email', async (req, res) => {
    const { email } = req.params
    const user = await DBServices.getUser(email)
    res.send(user)
})

router.post('/user', async (req, res) => {
    const user = req.body
    let id = await DBServices.saveUser(user)
    res.send(id)
})

router.put('/user/:id', async (req, res) => {
    const { id } = req.params
    const userData = req.body
    const saved = await DBServices.updateUser(id, userData)
    res.send(saved)
})

router.delete('/user/:id', async (req, res) => {
    const { id } = req.params
    const deleted = await DBServices.deleteUser(id)
    res.send(deleted)
})


module.exports = router