const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const brandSchema = new Schema({
    brandName:{
        type: String,
        required: true,
        maxLength: 15
    },
    icon:{
        type: String,
        required: true,
        maxLength: 100
    }

})

const Brand = mongoose.model('Brand',brandSchema,'brand');
module.exports = Brand;