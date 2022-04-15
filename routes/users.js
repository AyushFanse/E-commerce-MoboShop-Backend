const express = require('express');
const User = require('../modules/userModule');
const router = express.Router();

/* GET users listing. */
router.get('/getuser', User.getUser);

router.get('/getuser/:userId', User.getUserById);

router.patch('/updateuser/:userId', User.updateUser);

router.patch('/updatepassword/:userId', User.updatePassword);

router.delete('/deleteuser/:userId', User.deleteUser);

router.put('/saveproduct/:userId', User.SaveProduct);

router.put('/deletesavedproduct/:userId', User.DeleteSavedProduct);

module.exports = router;
