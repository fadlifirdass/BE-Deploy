const {Sequelize} = require('sequelize')

const db = new Sequelize("dummy99","root","",{
    host : "localhost",
    dialect : "mysql"
})

module.exports = db;