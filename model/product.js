const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const productSchema = new Schema({
    productName:{
        type: String,
        required: true,
        maxLength: 25
    },
    image:{
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
    battry:{
        type: Number,
        required: true
    },
    userQuanttity:{
        type: Number,
        required: true
    }
    // description:{
    //     type: String,
    //     required: true
    // },

})

const Product = mongoose.model('Product',productSchema,'product');
module.exports = Product;