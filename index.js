const express = require('express')
const FileUpload = require('express-fileupload')
const cors = require('cors')
const app = express()
const port = 5000;
const ProductRoutes = require('./routes/ProductRoutes')

app.use(cors())
app.use(express.json())
app.use(FileUpload())
app.use(express.static("public"))
app.use(ProductRoutes)
app.listen(port,()=>{
    console.log(`Server berjalan di port ${port}`)
})
