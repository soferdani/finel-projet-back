const Sequelize = require('sequelize')   
const sequelize = new Sequelize('mysql://root:@localhost/crm')

const data = require('../../src/react-crm-starter-data/data')

const insertCostumer = async (data) => {
    
    for (i in data) {
        let name = data[i].name.split(" ")
        let ownerName = data[i].owner.split(" ")
        let firstcreate = data[i].firstContact.replace("T"," ").replace("Z","")
        let sold = 0
        if (data[i].sold) {
            sold = 1
        }
        let findEmailType = `select id from emailtype where type_name='${data[i].emailType}'`
        let findCountry = `select id from countrys where country='${data[i].country}'`
        let findOwner = `select id from owners where firstName='${ownerName[0]}'
        and lastName='${ownerName[1]}'`
        
        let query = 
        `insert into clients (firstName, lastName, email, firstContact, sold, emailtype, country, owner)
        values ("${name[0]}","${name[1]}","${data[i].email}","${firstcreate}",${sold},(${findEmailType}),(${findCountry}),(${findOwner}));`
        await sequelize.query(query)
    
    }
}

// insertCostumer(data)


const insertEmailType = async (data) => { //done 
    let allEmailType = []
    for (i of data) {
        let currantEmailType = i.emailType
        if (!allEmailType.includes(currantEmailType)) {
            allEmailType.push(currantEmailType)
            let query = `insert into emailtype (type_name) values ("${currantEmailType}");`
            await sequelize.query(query)
        }
    }
}

const insertCountry = async (data) => { //done
    let allCountry = [] 
    for (i of data) {
        let currantCounty = i.country
        if (!allCountry.includes(currantCounty)) {
            allCountry.push(currantCounty)
            let query = `insert into countrys (country) values ("${currantCounty}");`
            await sequelize.query(query)
        }
    }
}


const insertOwners = async (data) => { // done
    let allOwners = []
    for (i in data) {
        let fullName = data[i].owner
        if (!allOwners.includes(fullName)) {
            allOwners.push(fullName)
            let firstName = fullName.split(" ")
            let query = `insert into OWNERS (firstName, lastName) values ("${firstName[0]}","${firstName[1]}");`
            await sequelize.query(query)
        }
    }
}

