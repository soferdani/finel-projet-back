const sequelize = require('./sqlConnection')
const moment = require('moment')

const todoDBServices = function () {

    const getTodos = async (id) => {
        const query = `SELECT t.t_id, task, is_complete, create_date, type_name, img
        FROM todo AS t JOIN user_type AS ut
        on t.service_type = ut.type_id
        WHERE t.property = ${id};`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }

    const saveTodo = async (todo) => {
        const query = `INSERT INTO todo VALUES(
        null,
        '${todo.task}',
        ${todo.property},
        ${todo.type},
        '${moment().format('YYYY-MM-DD')}',
        false,
        '${todo.img}');`
        const id = await sequelize.query(query)
        return id
    }

    const checkTodo = async (id) => {
        const query = `UPDATE todo
        SET  is_complete = 1
        WHERE t_id = ${id}`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }

    const updateTodo = async (id, todo) => {
        let query = `UPDATE todo SET `
        for (let i in Object.keys(todo)) {
            const key = Object.keys(todo)[i]
            const endChar = i == Object.keys(todo).length - 1 ? '' : ','
            if (typeof todo[key] === "string") {
                query += `${key} = '${todo[key]}'${endChar} `
            } else {
                query += `${key} = ${todo[key]}${endChar} `
            }
        }
        query += `WHERE t_id = ${id}`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }

    const deleteTodo = async (id) => {
        const query = `DELETE FROM todo WHERE t_id = ${id}`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }


    return {
        getTodos,
        saveTodo,
        checkTodo,
        updateTodo,
        deleteTodo
    }
}

module.exports = todoDBServices