const {Sequelize} = require('sequelize')

const db = new Sequelize("dummy99","admin","salmantraore",{
    host : "mysql-118804-0.cloudclusters.net",
    dialect : "mysql",
    port: 10037
})

module.exports = db;