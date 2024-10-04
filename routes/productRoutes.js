const express= require('express')
const ProductController=require('../controllers/ProductController');
const { model } = require('mongoose');
const router=express.Router();
router.post('/add-product/:firmId',ProductController.addProduct);
router.get('/:firmId/products',ProductController.getProductByFirm)
router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});
router.delete('/productId',ProductController.deleteProductById);
module.exports=router;
