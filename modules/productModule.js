const Product = require('../model/product');
const cloudinary = require("../middleWare/cloudinary");

exports.postProduct = async (req, res, next) => {
    var length;

    const productLength = await Product.find();

    if(productLength === 'undefine' || productLength > 1){
        length = 1;
    }else{        
        length = productLength.length + 1;
    }


    const result = await cloudinary.uploader.upload(req.file.path,{
        upload_preset:"Mobo_shop"
    });
    
    const product = new Product({
        file: result?.secure_url,
        cloudinary_id: result?.public_id,
        id: length,
        productName : req.body.productName,
        quanttity : req.body.quanttity,
        price : req.body.price,
        rom : req.body.rom,
        ram : req.body.ram,
        processor : req.body.processor,
        battery: req.body.battery,
        userQuanttity : req.body.userQuanttity || 0,
        available : req.body.available,
        brand : req.body.brand,
    })
    try {        
        var response = await product.save();
        res.status(200).json({msg : "You have successfully updated the product details..!", status : "success"})
    } catch(err){
        res.status(400).send(err)
    }
}

exports.getProduct = async (req, res, next) => {
    var response = await Product.find();
    res.send(response);
}

exports.getProductById = async (req, res, next) => {
    var response = await Product.findById(req.params.productId);
    res.send(response);
}

exports.updateProduct = async (req, res, next) => {
    try{
        const product = await Product.findById(req.params.productId);
        // Upload image to cloudinary
        let result;
        if (req.file) {
          
          await cloudinary.uploader.destroy(product.cloudinary_id);
  
          result = await cloudinary.uploader.upload(req.file.path,{
            upload_preset:"Mobo_shop"
        });
        }
        console.log(req.body)
        const data = {
            file: result?.secure_url || product.file,
            cloudinary_id: result?.public_id || product.cloudinary_id,
            productName : req.body.productName || product.productName,
            quanttity : req.body.quanttity || product.quanttity,
            price : req.body.price || product.price,
            rom : req.body.rom || product.rom,
            ram : req.body.ram || product.ram,
            processor : req.body.processor || product.processor,
            available : req.body.available || product.available,
            battery: req.body.battery || product.battery,
            userQuanttity : req.body.userQuanttity || product.userQuanttity,
            brand : req.body.brand || product.brand,
        };
        const response = await Product.findByIdAndUpdate(req.params.productId, data, { new: true });
        res.status(200).json({ msg : "You have successfully updated the product details..!", status : "success"});
      }catch(err){
        res.status(400).send(err);
    }
}


exports.deleteProduct = async (req, res, next) => {
    var response = await Product.findByIdAndRemove(req.params.productId);
    res.send(response);
}