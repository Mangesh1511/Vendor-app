const jwt=require('jsonwebtoken')
const express=require('express')

const isAuth=(req,res,next)=>{

    const authorization =req.headers.authorization;
    console.log('authorization part of the request is as follows: ',req.headers);
    if(authorization)
    {
        const token=authorization.slice(7,authorization.length);
        console.log(authorization)
        console.log('token is:',token);
        try{
            const decode=jwt.verify(token,process.env.SECRET_KEY);
        console.log('Decoded string is: ',decode);
        req.user=decode;
        console.log('Current User is: ',req.user);
        // console.log('So now authentication of the user is done going back to update the status of the payment!!!')
        next();
        }catch(err)
        {
            // console.log('Error is: ',err);
            res.status(500).send({message:"Invalid Token!!"});
        }
        

    }
    else
    {
        // console.log(err);
        res.status(401).send({message:'No Token'});
    }
}



module.exports ={isAuth};