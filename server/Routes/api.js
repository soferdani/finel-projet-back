const express = require('express')
const router = express.Router()
const DBServices = require('../db/DataBaseServices')()

//user routes
router.get('/user/:email/:password', async (req, res) => {
    const { email, password } = req.params
    const user = await DBServices.getUser(email, password)
    res.send(user)
})

router.post('/user', async (req, res) => {
    const user = req.body
    let id = await DBServices.saveUser(user)
    res.send(id)
})

router.put('/user/:id', async (req, res) => {
    const {id} = req.params
    const userData = req.body
    const saved = await DBServices.updateUser(id, userData)
    res.send(saved)
})

router.delete('/user/:id', async (req, res) => {
    const {id} = req.params
    const deleted = await DBServices.deleteUser(id)
    res.send(deleted)
})

//propertie routes
router.get('/properties/:id', async (req, res) => {
    const { id } = req.params
    const properties = await DBServices.getProperties(id)
    res.send(properties)

})

router.post('/property', async (req, res) => {
    const propertie = req.body
    const id = await DBServices.saveProperty(propertie)
    res.send(id)
})

router.put('/property', async (req, res) => {
    const {key, value, id} = req.body
    const saved = await DBServices.updateProperty(key, value, id)
    res.send(saved)
})

router.delete('/property/:id', async (req, res) => {
    const {id} = req.params
    const deleted = await DBServices.deleteProperty(id)
    res.send(deleted)
})

//todo routes
router.get('/todos/:id', async (req, res) => {
    const { id } = req.params
    const todos = await DBServices.getTodos(id)
    res.send(todos)
})

router.post('/todo', async (req, res) => {
    const user = req.body
    const id = await DBServices.saveTodo(user)
    res.send(id)
})

router.put('/todo', async (req, res) => {
    const {key, value, id} = req.body
    const saved = await DBServices.updateTodo(key, value, id)
    res.send(saved)
})

router.delete('/todo/:id', async (req, res) => {
    const {id} = req.params
    const deleted = await DBServices.deleteTodo(id)
    res.send(deleted)
})


module.exports = router