const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type : String,
        minLength: 5,
        required : true
    },
    first_name:{
        type : String,
        required : true
    },
    last_name:{
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
    number:{
        type : String,
        minLength: 10,
        maxLength: 10,
        required : true
    },
    password:{
        type : String,
        required : true,
        minLength: 5
    },
    savedProduct:[Object]
})


const User = mongoose.model('User' ,userSchema ,'User' );
module.exports = User;