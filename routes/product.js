const express = require('express');
const router = express.Router();
const upload = require('../middleWare/multer');
const {
    postProduct,
    getProduct,
    getProductById,
    updateProduct,
    deleteProduct,
} = require('../modules/productModule');

router.post('/saveproduct', upload.single('file'), postProduct);
router.get('/getproduct', getProduct);
router.get('/getproduct/:productId', getProductById);
router.patch('/updateproduct/:productId', upload.single('file'), updateProduct);
router.delete('/deleteproduct/:productId', deleteProduct);

module.exports = router;