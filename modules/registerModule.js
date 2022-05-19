const Joi = require('joi');
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
    const schema = Joi.object({
        first_name: Joi.string().min(3).max(50).required(),
        last_name: Joi.string().min(3).max(50).required(),
        username: Joi.string().min(4).max(25).required(),
        email: Joi.string().min(6).max(50).email().required(),
        number: Joi.string().min(10).max(15).pattern(/^[0-9]+$/).required(),
        password: Joi.string().min(4).max(15).required(),
        address: Joi.string().min(3).max(20).required(),
        savedProduct: Joi.object({}),
        post: Joi.string().valid('Admin', 'User'),
        id: Joi.string()
    })

    try {

        var { error } = await schema.validate(req.body);
        if (error) return res.status(400).send({ msg: error.details[0].message });

        var existUser = await User.findOne({ "email": req.body.email }).exec();
        if (existUser) return res.status(400).send({ msg: "Email already exists.", status: "error" });

        var existUsername = await User.findOne({ "username": req.body.username }).exec();
        if (existUsername) return res.status(400).send({ msg: "Username already exists.", status: "error" });

        var existNumber = await User.findOne({ "number": req.body.number }).exec();
        if (existNumber) return res.status(400).send({ msg: "Number already exists.", status: "error" });

        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        const size = await User.find();

        const user = new User({
            id: size.length + 1,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            email: req.body.email,
            number: req.body.number,
            password: req.body.password,
            address: req.body.address,
            savedProduct: req.body.savedProduct,
            post: req.body.post || "User",
        })
        var response = await user.save();
        res.status(201).send({ msg: "You Have Successfully Registered Your Account..!", status: "success" }).send(response);
    } catch (err) {
        res.status(400).send(err);
    }
}

/*--------------------------------------* LOGIN *--------------------------------------*/

exports.login = async (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().min(6).max(50).email().required(),
        password: Joi.string().min(4).max(15).required()
    })

    try {
        var { error } = await schema.validate(req.body);
        if (error) return res.status(400).send({ msg: error.details[0].message });
        console.log(User);

        var existUser = await User.findOne({ "email": req.body.email }).exec();
        if (!existUser) return res.status(400).send({ msg: "Email not reqistered", status: "error" });

        var user = {};
        user.username = existUser.username;
        user.first_name = existUser.first_name;
        user.last_name = existUser.last_name;
        user.email = existUser.email;
        user.number = existUser.number;
        user._id = existUser._id;
        user.savedProduct = existUser.savedProduct;
        user.post = existUser.post;


        var isValid = await bcrypt.compare(req.body.password, existUser.password);
        if (!isValid) return res.status(400).send({ msg: "Password doesn't match.", status: "error" });

        var token = jwt.sign({ user }, 'SWERA', { expiresIn: '2h' });
        res.send({ userToken: token, status: "success" });
    } catch (err) {
        res.status(400).send(err);
    }
}