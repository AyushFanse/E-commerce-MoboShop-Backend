const Brand = require('../model/brand');
const router = require('../routes');


exports.postBrand = async (req, res, next) => {
    const brand = new Brand({
        brandName : req.body.brandName,
        icon: req.body.icon
        // description : req.body.description
    })
    try {
        var response = await brand.save();
        res.send(response)
    } catch(err){
        res.status(400).send(err)
    }
}

exports.getBrand = async (req, res, next) => {
    var response = await Brand.find();
    res.send(response);
}

exports.updateBrand = async (req, res, next) => {
    const {brandId} = req.params;
    var response = await Brand.findByIdAndUpdate(brandId,{
        userQuanttity : req.body.userQuanttity
    },{new : true})
    res.send(response);
}


exports.deleteBrand = async (req, res, next) => {
    var response = await Brand.findByIdAndRemove(req.params.brandId);
    res.send(response);
}

// router.get('/data', function (req, res, next) => {
//     validation...
//     next()
// })
// app.use();
// router.get('/userdata',)
// router.get ('/data', function (req, res, next) => {
//     getting from server
//     res.send()
// })