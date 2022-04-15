const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const productSchema = new Schema({
    file:{
        type: String,
        required: true
    },
    cloudinary_id:{
        type: String,
        required: true
    },
    productName:{
        type: String,
        required: true,
        maxLength: 25
    },
    quanttity:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    rom:{
        type: Number,
        required: true
    },
    ram:{
        type: Number,
        required: true
    },
    processor:{
        type: String,
        required: true
    },
    battery:{
        type: Number,
        required: true
    },
    userQuanttity:{
        type: Number,
        required: true
    },
    id:{
        type: String,
        required: true
    },
    available:{
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true
    }
})

const Product = mongoose.model('Product',productSchema,'product');
module.exports = Product;