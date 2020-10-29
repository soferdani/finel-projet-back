const sequelize = require('./sqlConnection')

const propertyDBServices = function () {

    const getProperties = async (id) => {
        const query = `SELECT id, img,
        adress, num_roms AS roomNum,
        bathroms AS bathrooms, max_gusts AS maxGusts, pool,
        ac, wifi, kitchen, owner, name, phone, country, email
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
        }
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
        ${propertie.owner.id[0]})`
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