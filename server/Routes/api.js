const express = require('express')
const router = express.Router()


const Sequelize = require('sequelize')   
const sequelize = new Sequelize('mysql://root:@localhost/crm')



router.get('/getAllClients', async (req, res) => { //get all data
    const query = `SELECT c.id, c.firstName as clineFirstName , c.lastName as clineLastName, c.email, c.firstContact, c.sold, co.country as country , o.firstName , o.lastName , t.type_name as emailType
    from owners as o, countrys as co, emailtype as t , clients as c
    where o.id = c.owner 
    AND co.id = c.country
    and t.id = c.emailtype;`
    const responseFromDB = await sequelize.query(query)
    res.send(responseFromDB[0])
})

router.get('/getCountry/:countryId', async (req, res) => {
    const countryId = req.params.countryId    
    res.send(countryId)
})

module.exports = router