const router=require('express').Router();
const ProductData=require('../models/producModel');
const auth=require('../middlewares/auth');
const {login,register}=require('../controllers/userControllers')
// const bcrypt=require('bcrypt')

module.exports=router