const Brand = require('../model/brand');
const router = require('../routes');


exports.postBrand = async (req, res, next) => {
    const brand = new Brand({
        brandName : req.body.brandName,
        icon: req.body.icon
    })
    try {
        var response = await brand.save();
        res.send(response)
    } catch(err){
        res.status(400).send(err)
    }
}

exports.getBrands = async (req, res, next) => {
    try {
        let response = await Brand.find();
        res.status(200).send(response);
    } catch(err){
        res.status(400).send(err)
    }
}

exports.getBrand = async (req, res, next) => {
    try {
        let response = await Brand.findById(req.params.id);
        res.status(200).send(response);
    } catch(err){
        res.status(400).send(err)
    }
}

exports.updateBrand = async (req, res, next) => {
    const {id} = req.params;
    try {
        let response = await Brand.findByIdAndUpdate(id,{
            userQuanttity : req.body.userQuanttity
        },{new : true})
        res.status(200).send(response);
    } catch(err){
        res.status(400).send(err)
    }
}


exports.deleteBrand = async (req, res, next) => {
    var response = await Brand.findByIdAndRemove(req.params.id);
    res.status(200).send(response);
}
