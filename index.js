const express = require('express')
const FileUpload = require('express-fileupload')
const cors = require('cors')
const session = require('express-session')
const dotenv = require('dotenv')
const db = require('./config/Database')
const SequelizeStore = require('connect-session-sequelize')
const app = express()
const ProductRoutes = require('./routes/ProductRoutes')
const UserRoutes = require('./routes/UserRoutes')
const AuthRoutes = require('./routes/AuthRoutes')
dotenv.config()


const sessionStore = SequelizeStore(session.Store);


const store = new sessionStore({
    db: db
})

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store, store,
    cookie:{
        secure: 'auto'
    }
}))

app.use(cors({
    credentials:true,
    origin: 'http://localhost:3000'
}))
app.use(express.json())
app.use(FileUpload())
app.use(express.static("public"))
app.use(ProductRoutes)
app.use(UserRoutes)
app.use(AuthRoutes)

// store.sync()


app.listen(process.env.APP_PORT,()=>{
    console.log(`Server berjalan...`)
})
