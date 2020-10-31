const express = require('express')
const router = express.Router()
const DBServices = require('../db/todoServices')()

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
    const { status } = req.body
    const saved = await DBServices.checkTodo(id, status)
    res.send(saved)
})

router.put('/todoChange/:id', async (req, res) => {
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

module.exports = router