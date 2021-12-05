const mongoose = require('mongoose');

exports.connect = () => {
    try{
        mongoose.connect('mongodb+srv://AyushFanse:AyushFanse@cluster0.pspkx.mongodb.net/E-commerce-Website-Data?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true})
    } catch(err) {
        console.log("err");
        process.exit();
    }
}

// mongodb://localhost:27017/MyShop