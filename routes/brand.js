const express = require('express');
const router = express.Router();
const upload = require('../middleWare/multer');
const {
    postBrand,
    getBrands,
    getBrand,
    updateBrand,
    deleteBrand,
    } = require('../modules/brandModule');

router.post('/savebrand', upload.single('file'), postBrand);
router.get('/getbrands', getBrands);
router.get('/getbrand/id', getBrand);
router.patch('/updatebrand/:id', updateBrand);
router.delete('/deletebrand/:id', deleteBrand);

module.exports= router;