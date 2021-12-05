var express = require('express');
var router = express.Router();
var brandModule = require('../modules/brandModule');

router.post('/savebrand', brandModule.postBrand);
router.get('/getbrand', brandModule.getBrand);
router.patch('/updatebrand/:brandName', brandModule.updateBrand);
router.delete('/deletebrand/:brandName', brandModule.deleteBrand);

module.exports= router;