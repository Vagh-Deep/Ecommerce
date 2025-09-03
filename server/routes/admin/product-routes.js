const express = require('express')
const{handleImageUpload, addProduct, editProduct, deleteProduct, fetchAllProduct} = require('../../Controllers/admin/products-controller.js')
const {upload} = require('../../helpers/cloudinary.js')

const router= express.Router();
router.post('/upload-image',upload.single('my_file'),handleImageUpload)
router.post('/add',addProduct)
router.put('/edit/:id',editProduct)
router.delete('/delete/:id',deleteProduct)
router.get('/get',fetchAllProduct)

module.exports= router;
