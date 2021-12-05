var express = require('express');
var router = express.Router();
var productModule = require('../modules/productModule');

router.post('/saveproduct', productModule.postProduct);
router.get('/getproduct', productModule.getProduct);
router.patch('/updateproduct/:productId', productModule.updateProduct);
router.delete('/deleteproduct/:productId', productModule.deleteProduct);

module.exports= router;