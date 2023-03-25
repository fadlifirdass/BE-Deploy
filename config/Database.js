const {Sequelize} = require('sequelize')

const db = new Sequelize("dummy99","admin","salmantraore",{
    host : "mysql-117511-0.cloudclusters.net",
    dialect : "mysql"
})

module.exports = db;