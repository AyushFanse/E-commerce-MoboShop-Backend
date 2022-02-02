const express = require('express');
const User = require('../modules/userModule');
const router = express.Router();

/* GET users listing. */
router.get('/getuser', User.getUser);

router.patch('/updateuser/:userId', User.updateUser);

router.delete('/deleteuser/:userId', User.deleteUser);

router.put('/saveproduct/:userId', User.SaveProduct);

router.put('/deletesavedproduct/:userId', User.DeleteSavedProduct);

module.exports = router;
