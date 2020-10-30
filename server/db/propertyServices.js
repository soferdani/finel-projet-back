const sequelize = require('./sqlConnection')

const propertyDBServices = function () {

    const getProperties = async (id) => {
        const query = `SELECT id, img, p.name as propertyName,
        address, rooms,
        bathrooms, guests, pool,
        ac, wifi, kitchen, o.name as ownerName,
        phone, country, email, owner as ownerId
        FROM property AS p JOIN property_user AS po ON p.id = po.property
        JOIN owner AS o ON o.o_id = p.owner
        WHERE po.user = ${id}`
        const [responseFromDB] = await sequelize.query(query)
        return responseFromDB
    }

    const saveProperty = async (propertie) => {
        if(!propertie.owner.id){
            const ownerQuery = `INSERT INTO owner VALUES(
                null,
                '${propertie.owner.name}',
                '${propertie.owner.phone}',
                '${propertie.owner.country}',
                '${propertie.owner.email}')`
                propertie.owner.id = await sequelize.query(ownerQuery)
                propertie.owner.id = propertie.owner.id[0]
        }
        const query = `INSERT INTO property VALUES(
        null,
        '${propertie.img}',
        '${propertie.address}',
        ${propertie.rooms},
        ${propertie.bathrooms},
        ${propertie.guests},
        ${propertie.pool},
        ${propertie.ac},
        ${propertie.wifi},
        ${propertie.kitchen},
        ${propertie.owner.id},
        '${propertie.name}')`
        const propertyId = await sequelize.query(query)
        const joinQuery = `INSERT INTO property_user VALUES(
            ${propertie.manager},
            ${propertyId[0]})`
        await sequelize.query(joinQuery)
        return [propertyId[0], propertie.owner.id[0]]
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