const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type : String,
        minLength: 5,
        required : true
    },
    fname:{
        type : String,
        required : true
    },
    lname:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    address:{
        type : String,
        required : true,
    },
    phone:{
        type : String,
        minLength: 10,
        maxLength: 10,
        required : true
    },
    password:{
        type : String,
        required : true,
        minLength: 5
    }
})


const User = mongoose.model('User' ,userSchema ,'User' );
module.exports = User;