const {Sequelize} = require("sequelize")
const db = require("../config/Database")


const {DataTypes} = Sequelize;

const Product = db.define('product',{
    name: DataTypes.STRING,
    image : DataTypes.STRING,
    url: DataTypes.STRING,
    price: DataTypes.STRING,
    alamat: DataTypes.STRING
},{
    freezeTableName : true
})

module.exports = Product;

// (async()=>{
//    await db.sync()
// })()