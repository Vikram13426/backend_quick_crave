const Product = require("../models/Product");
const multer = require("multer");
const Firm = require('../models/Firm')
const path = require('path');
const { model } = require("mongoose");


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
});

const upload = multer({ storage: storage });

const addProduct = async(req, res) => {
    try {
        const { productName, price, category, bestSeller, description } = req.body;
        const image = req.file ? req.file.filename : undefined;

        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);

        if (!firm) {
            return res.status(404).json({ error: "No firm found" });
            
        }

        const product = new Product({
            productName,
            price,
            category,
            bestSeller,
            description,
            image,
            firm: firm._id
        })

        const savedProduct = await product.save();
        firm.products.push(savedProduct);


        await firm.save()

        res.status(200).json({savedProduct})

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}
const getProductByFirm=async(req,res)=>{
    try {
        const  firmId=req.params.firmId;
        const firm= await Firm.findById(firmId);
        if(!firm){
            return res.status(404).json({error:"NO Firm Found"})
        }   
        const restaurentName=await firm.firmName;
        const products=await Product.find({firm:firmId});
        res.status(200).json({ restaurentName,products});

        
    } catch (error) {
        console.log(error);
        return res.status(404).json({error:"NO Firm Found"})
        
    }

}

const deleteProductById =async(req,res)=>{
    try {
        
        const productId=req.params.productId;
        const deleteProduct=await Product.findByIdAndDelete(productId);
        if(!deleteProduct){
            return res.status(404).json({error:"No product found"});
        }
        
    } catch (error) {
        console.log(error)
        return res.status(404).json({error:"No product found"});
        
    }

}
module.exports = { addProduct: [upload.single('image'), addProduct],getProductByFirm,deleteProductById};