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

//SignUp API
userRoutes.post('/signup',expressasyncHandler(async(req,res)=>{
    console.log(req.body);
    try
    {
    
    const Checkuser =await User.findOne({email:req.body.Email});

    if(!Checkuser)
    {
        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(req.body.Password,salt);
        const person=new User({
            username:req.body.Name,
            email:req.body.Email,
            password:hashPassword
        });

        const user=person.save();
        const token=jwt.sign({_id:user._id,email:user.email,username:user.username},process.env.SECRET_KEY,{expiresIn:'30d'});
        console.log('JWT TOKEN SENT TO FRONTEND  FROM SIGN_UP IS: ',token);

        res.status(200).json({
            _id:user._id,
            email:user.email,
            username:user.username,
            isAdmin:req.body.isAdmin,
            token:token
        });
    }
    else
        res.status(404).send({message:'Already Registered With Us! Please try to SignIn'});
    
    }
    catch(err)
    {
        res.status(500).send('Backend Error');
    }

}))


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
            console.log('JWT TOKEN SENT TO FRONTEND IS FROM SIGN-IN: ',token);
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
            res.status(401).json({message:'Wrong password Please try again!'});
    
        }
    }
    else
    {
        res.status(401).send({message:'Email Not registered with us Please Sign Up to register!'});
        return;
    }
}))
userRoutes.get('/:id',expressasyncHandler(async(req,res)=>{
   
    const user=await User.findById(req.params.id);

    res.status(200).send({user});

}))
module.exports=userRoutes;