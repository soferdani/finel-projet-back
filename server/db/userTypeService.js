const sequelize = require('./sqlConnection')



const userTypeDBServices = function () {
    const getUserType = async (id) => { 
        let query
        if (id) {  
            query = `SELECT type, type_id as id  from user_type where type_id = ${id};`
        } else {
            query = `SELECT type, type_id as id from user_type;`
        }
        const result = await sequelize.query(query)
        console.log(result);
        return result
    }

    const addNewUserType = async (type) => { 
        let query = `insert INTO user_type values (
            null,
            '${type}'
        );`
        const userType = await sequelize.query(query)
        return userType
    }


    const updateUserType = async (type, id) => { 
        let query = `UPDATE user_type set type = '${type}' where type_id = ${id};`
        const userType = await sequelize.query(query)
        return userType
    }

    const deleteUserType = async (id) => { 
        let query = `DELETE from user_type where type_id = ${id};`
        const userType = await sequelize.query(query)
        return userType
    }

    return {
        getUserType,
        addNewUserType,
        updateUserType,
        deleteUserType
    }
}

module.exports = userTypeDBServices