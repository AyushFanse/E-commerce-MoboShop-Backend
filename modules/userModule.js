const User = require('../model/User');
const  bcrypt = require('bcrypt');
const Joi = require('joi');


///////////////////////////* Get All Users From DataBase *////////////////////////////

exports.getUser = async(req, res, next)=>{
    try{
      var response = await User.find();
      res.status(200).send(response);
    }catch(err){
      res.status(400).send(err);
  }
  };


///////////////////////////* Get User By Id From DataBase *////////////////////////////

exports.getUserById = async(req, res, next)=>{
  try{
    var response = await User.findById(req.params.userId);
    res.status(200).send(response);
  }catch(err){
    res.status(400).send(err);
}
};


///////////////////////////* Update User By Id *////////////////////////////

  exports.updateUser =async (req, res, next)=>{

    try{
      const user = await User.findById(req.params.userId);      
      const data = {
        first_name: req.body.first_name || user.first_name,
        last_name: req.body.last_name || user.last_name,
        username: req.body.username || user.username,
        number: req.body.number || user.number,
        address: req.body.address || user.address,
        post: req.body.post || user.post,
        email: req.body.email || user.email
      };
      const response = await User.findByIdAndUpdate(req.params.userId, data, { new: true });
      res.status(200).json({msg: 'Your Account has been updated succeccfully...', status:'success' });
    }catch(err){
      res.status(400).send(err);
  }
  };

  ///////////////////////////* Update User By Id *////////////////////////////

  exports.updatePassword =async (req, res, next)=>{

    try{
      const newPassword = await bcrypt.hash(req.body.password, 10);
      const response = await User.findByIdAndUpdate(req.params.userId,{
        password:newPassword
      },{new : true})
      res.status(200).json({data : response });
    }catch(err){
      res.status(400).send(err);
  }
  };


///////////////////////////* Delete User By Id *////////////////////////////

  exports.deleteUser =async (req, res, next) => {
    try{
      await User.findByIdAndRemove(req.params.userId);
      res.status(200).json({msg: 'Your Account has been deleted succeccfully...', status:'success' });
  }catch(err){
    res.status(400).send(err);
  }
  };

  
///////////////////////////* Save The Product *////////////////////////////

 exports.SaveProduct = async (req, res, next) => {
  try{
      let product = await User.findByIdAndUpdate(req.params.userId,{            
          $push:{savedProduct: req.body.savedProduct}
          },{new : true})
      res.status(200).send(product);
  }catch(error){
      res.status(400).send(error.message);
  }
}


///////////////////////////* Delete the Saved The Product *////////////////////////////

 exports.DeleteSavedProduct = async (req, res, next) => {
  try{
      let product = await User.findByIdAndUpdate(req.params.userId,{            
          $pull:{savedProduct: req.body.savedProduct}
          },{new : true})
      res.status(200).send(product);
  }catch(error){
      res.status(400).send(error.message);
  }
}

