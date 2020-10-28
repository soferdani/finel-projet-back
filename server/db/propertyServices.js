const sequelize = require('./sqlConnection')

const propertyDBServices = function () {

    const getProperties = async (id) => {
        const query = `SELECT id, img, adress, num_roms, bathroms, max_gusts, pool, ac, wifi,kitchen, owner, name, phone, country, email
        FROM property AS p JOIN property_user AS po ON p.id = po.property
        JOIN owner AS o ON o.o_id = p.owner
        WHERE po.user = ${id}`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }

    const saveProperty = async (propertie) => {
        const query = `INSERT INTO property VALUES(
        null,
        '${propertie.img}',
        '${propertie.adress}',
        ${propertie.numRooms},
        ${propertie.bathrooms},
        ${propertie.maxGusts},
        ${propertie.pool},
        ${propertie.ac},
        ${propertie.wifi},
        ${propertie.kitchen},
        ${propertie.owner})`
        const id = await sequelize.query(query)
        const joinQuery = `INSERT INTO property_user VALUES(
            ${propertie.manager},
            ${id[0]})`
        await sequelize.query(joinQuery)
        return id
    }

    const updateProperty = async (propertyData, id) => {
        let query = `UPDATE property SET `
        for (let i in Object.keys(propertyData)) {
            const key = Object.keys(propertyData)[i]
            const endChar = i == Object.keys(propertyData).length - 1 ? '' : ','
            if (typeof propertyData[key] === "string") {
                query += `${key} = '${propertyData[key]}'${endChar} `
            } else {
                query += `${key} = ${propertyData[key]}${endChar} `
            }
        }
        query += `WHERE id = ${id}`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }

    const deleteProperty = async (id) => {
        await sequelize.query(`DELETE FROM todo WHERE property = ${id}`)
        await sequelize.query(`DELETE FROM property_user WHERE property = ${id}`)
        const query = `DELETE FROM property WHERE id = ${id}`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }


    return {
        getProperties,
        saveProperty,
        updateProperty,
        deleteProperty
    }
}

module.exports = propertyDBServices