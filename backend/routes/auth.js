const router=require('express').Router();
const Data=require('../models/producModel');
// const {authorize}=require('../middlewares/auth');
const {login,register,addtoCart}=require('../controllers/userControllers')
// const bcrypt=require('bcrypt')


router.post('/login',login);
router.post('/register',register);

// router.post('/autRoute',addtoCart);
module.exports=router