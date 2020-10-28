const express = require('express')
const router = express.Router()
const DBServices = require('../db/DataBaseServices')()

//user routes
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

router.put('/property/:id', async (req, res) => {
    const { id } = req.params
    const propertiy = req.body
    const saved = await DBServices.updateProperty(propertiy, id)
    res.send(saved)
})

router.delete('/property/:id', async (req, res) => {
    const { id } = req.params
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
    const todo = req.body
    const id = await DBServices.saveTodo(todo)
    res.send(id)
})

router.put('/todo/:id', async (req, res) => {
    const { id } = req.params
    const saved = await DBServices.checkTodo(id)
    res.send(saved)
})

router.put('/changeTodo/:id', async (req, res) => {
    const { id } = req.params
    const todo = req.body
    const saved = await DBServices.updateTodo(id, todo)
    res.send(saved)
})

router.delete('/todo/:id', async (req, res) => {
    const { id } = req.params
    const deleted = await DBServices.deleteTodo(id)
    res.send(deleted)
})

//servicer routes
// router.get('/servicer/:id', async (req, res) => {
//     const { id } = req.params
//     const properties = await DBServices.getServicer(id)
//     res.send(properties)

// })

// router.post('/servicer', async (req, res) => {
//     const propertie = req.body
//     const id = await DBServices.saveServicer(servicer)
//     res.send(id)
// })

// router.put('/property/:id', async (req, res) => {
//     const { id } = req.params
//     const propertiy = req.body
//     const saved = await DBServices.updateServicer(propertiy, id)
//     res.send(saved)
// })


module.exports = router