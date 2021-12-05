var express = require('express');
const User = require('../model/User');
var router = express.Router();

/* GET users listing. */
router.get('/getuser', async(req, res, next)=>{
  var response = await User.find();
    res.send(response);
});


router.get('/getuser/:name', async(req, res, next)=>{
  var response = await User.findByName(req.acceptsLanguagesname);
    res.send(response);
});

router.patch('/updateuser/:userId', async (req, res, next)=>{
  const {userId} = req.params;
    var response = await User.findByIdAndUpdate(userId,{
      username:req.body.username,
      email:req.body.email,
      fname:req.body.fname,
      lname:req.body.lname,
      phone:req.body.phone,
      address:req.body.address,
      password:req.body.password
    },{new : true})
    res.send(response);
});

router.delete('/deleteuser/:userId', async (req, res, next) => {
  var response = await User.findByIdAndRemove(req.params.userId);
  res.send(response);
});


module.exports = router;
