const Product = require('../models/ProductModel')
const path = require('path')
const fs = require('fs')

const getProducts = async (req,res) => {
    try {
        const response = await Product.findAll()
        res.json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const getProductById = async (req,res) => {
    try {
        const response = await Product.findOne({
            where : {
                id : req.params.id
            }
        })
        res.json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const saveProduct = async (req,res) => {
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"})
    const name = req.body.title
    const file = req.files.file
    const fileSize = file.data.length
    const ext = path.extname(file.name)
    const fileName = file.md5 + ext
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`
    const allowedType = ['.png','.jpeg','.jpg']

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Image !"})
    if(fileSize > 5000000) return res.status(422).json({msg: "Gambar harus kurang dari 5mb !"})

        file.mv(`./public/images/${fileName}`, async(err)=>{
            if(err) return res.status(500).json({msg: err.message})
            try {
                await Product.create({name: name, image: fileName, url: url})
                res.status(201).json({msg: "Product Created Successfully"})
            } catch (error) {
                res.status(500).json({msg: error.message})
            }
        })

}

const updateProduct = async(req,res) => {
    const product = await Product.findOne({
        where : {
            id : req.params.id
        }
    })
    if(!product) return res.status(404).json({msg : "no data found !"})
    let fileName = ""
    if(req.file === null){
        fileName = Product.image
    }else{
    const file = req.files.file
    const fileSize = file.data.length
    const ext = path.extname(file.name)
    fileName = file.md5 + ext 
    const allowedType = ['.png','.jpeg','.jpg']

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Image !"})
    if(fileSize > 5000000) return res.status(422).json({msg: "Gambar harus kurang dari 5mb !"})

    const filepath = `./public/images/${product.image}`
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err)=>{
        if(err) return res.status(500).json({msg: err.message})
    })
    }
    const name = req.body.title
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`
    try {
        await Product.update({name: name, image:fileName, url:url},{
            where:{
                id: req.params.id
            }
        })
        res.status(200).json({msg: "Product Updated Successfuly !"})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }

}


const deleteProduct = async (req,res) => {
        const product = await Product.findOne({
            where : {
                id : req.params.id
            }
        })
        if(!product) return res.status(404).json({msg : "no data found !"})
        try {
            const filepath = `./public/images/${product.image}`
            fs.unlinkSync(filepath);
            await Product.destroy({
                where : {
                    id : req.params.id
                }
            })
            res.status(200).json({msg: "Product Deleted Successfuly !"})
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
}




module.exports = {getProducts, getProductById, saveProduct, updateProduct, deleteProduct}