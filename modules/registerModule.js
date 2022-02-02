const Joi = require('joi');
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(4).max(25).required(),
        email: Joi.string().min(6).max(50).email().required(),
        first_name: Joi.string().min(3).max(50).required(),
        last_name: Joi.string().min(3).max(50).required(),
        number: Joi.string().pattern(/^[0-9]+$/).required(),
        address: Joi.string().min(3).max(20),
        password: Joi.string().min(4).max(15).required(),
        savedProduct: Joi.object({})
    })

    var {error} = await schema.validate(req.body);
    if (error) return res.status(400).send({msg : error.details[0].message});

    var existUser = await User.findOne({"email": req.body.email}).exec();
    if(existUser) return res.status(200).send({msg : "User already exists."});

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    
    const user = new User({
        username:req.body.username,
        email:req.body.email,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        number:req.body.number,
        address:req.body.address,
        password:req.body.password,
        savedProduct:req.body.savedProduct
    })

    var response = await user.save();
    res.send(response);

}


exports.login = async (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().min(6).max(50).email().required(),
        password: Joi.string().min(4).max(15).required()
    })
    
    var {error} = await schema.validate(req.body);
    if (error) return res.status(400).send({msg : error.details[0].message});
    console.log( User);

    var existUser = await User.findOne({"email": req.body.email}).exec();
    if(!existUser) return res.status(400).send({msg : "Email not reqistered"});
    var user={};
    user.username = existUser.username;
    user.first_name = existUser.first_name;
    user.last_name = existUser.last_name;
    user.email = existUser.email;
    user.number = existUser.number;
    user._id = existUser._id;
    user.savedProduct=existUser.savedProduct;
    

    var isValid = await bcrypt.compare(req.body.password, existUser.password);
    if(!isValid) return res.status(400).send({msg : "Password doesn't match."});

    var token = jwt.sign({user}, 'SWERA', {expiresIn: '2h'});
    res.send(token);
}