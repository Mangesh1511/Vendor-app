const express=require('express');
const User =require('../models/userModel');
const expressasyncHandler=require('express-async-handler')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const userRoutes=express.Router();

// Add the user;
userRoutes.get('/',async(req,res)=>{
    console.log('In the add user request\n');
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const user =new User({
        username:req.body.name,
        email:req.body.email,
        password:hashPassword,
        isAdmin:req.body.isAdmin
    });

    const person=await user.save();

    res.status(200).json({person:person});
})


//Signin API
userRoutes.post('/signin',expressasyncHandler(async(req,res)=>{

    const user=await User.findOne({email:req.body.email});
    if(user)
    {
        console.log('User details are as follows: ',req.body,user.email);
        const Validpassword = await bcrypt.compare(req.body.password, user.password);
        if(Validpassword)
        {
            const token=jwt.sign({_id:user._id,email:user.email,username:user.username},process.env.SECRET_KEY,{expiresIn:'30d'});
            res.status(200).json({
                _id:user._id,
                email:user.email,
                username:user.username,
                isAdmin:req.body.isAdmin,
                token:token
            });
            return;
        }
        else
        {
            res.status(401).json('Wrong password Please try again!');
            return;
        }
    }
    else
    {
        res.status(401).send({message:'Email Not registered with us Please Sign Up to register!'});
        return;
    }
}))
module.exports=userRoutes;