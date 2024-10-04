const express=require('express')
const FirmController=require('../controllers/FirmController')
const router=express.Router();
const verifyToken=require('../middleware/verifyToken')
router.post('/add-firm',verifyToken,FirmController.addFirm);
router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});
router.delete('/:firmId',FirmController.deleteFirmById);


module.exports=router
