const Product = require('../model/product');
const router = require('../routes');


exports.postProduct = async (req, res, next) => {
    const product = new Product({
        productName : req.body.productName,
        image: req.body.image,
        quanttity : req.body.quanttity,
        price : req.body.price,
        rom : req.body.rom,
        ram : req.body.ram,
        processor : req.body.processor,
        battry: req.body.battry,
        userQuanttity : req.body.userQuanttity
        // description : req.body.description,
    })
    try {
        var response = await product.save();
        res.send(response)
    } catch(err){
        res.status(400).send(err)
    }
}

exports.getProduct = async (req, res, next) => {
    var response = await Product.find();
    res.send(response);
}

exports.updateProduct = async (req, res, next) => {
    const {productId} = req.params;
    var response = await Product.findByIdAndUpdate(productId,{
        userQuanttity : req.body.userQuanttity
    },{new : true})
    res.send(response);
}


exports.deleteProduct = async (req, res, next) => {
    var response = await Product.findByIdAndRemove(req.params.productId);
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