const express=require('express');
const Order =require('../models/orderModel');
const User=require('../models/userModel');
const expressasyncHandler=require('express-async-handler')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {isAuth }=require('../middlewares/auth');
const { default: axios } = require('axios');
const orderRoutes=express.Router();




orderRoutes.post('/',isAuth,expressasyncHandler(async(req,res)=>{
    console.log('At the current api request: ',req.url,req.method);
    console.log('User info is as follows got from the middleware',req.user._id);
   
    try{
        const order=new Order({
            orderItems:req.body.orderItems.map((x)=>({
                ...x,product:x._id
            })),
            shippingAddress:req.body.shippingAddress,
            paymentMethod:req.body.paymentMethod,
            itemsPrice:req.body.itemsPrice,
            shippingPrice:req.body.shippingPrice,
            taxPrice:req.body.taxPrice,
            totalPrice:req.body.totalPrice,
            user:req.user._id,
        });    
  
            const newOrder=await order.save();
            
            res.status(200).send({message:'New Order Created',newOrder});
    }
    catch(err)
    {
        console.log('Error occured after coming back from the middleware:\n');
        console.log(err);
    }
        
    
   
    
}))


orderRoutes.get('/:id',isAuth,async(req,res)=>{

    const checkOrder=await Order.findById(req.params.id);
    if(checkOrder)
    {
        console.log(checkOrder);

        res.status(200).send({data:checkOrder});
    }
    else
    {
        res.status(404).send({message:"Order not found With given id please give the correct Id number!"});
    }
});

orderRoutes.put('/:id/pay',isAuth,expressasyncHandler(async(req,res)=>{

    console.log('Updating the order details after payment being done for the user',req.params.id);
    console.log(req.url,req.method,req);
    const order=await Order.findById(req.params.id);
    if(order){
        order.isPaid=true;
        order.paidAt=Date.now();
        order.paymentResult={
            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            email_address:req.body.email_address,
        };
        const updatedOrder=await order.save();
        res.status(200). send({message:'Order Paid',order:updatedOrder});
        
    }
    else{
            res.status(404).send({message:'Order Not Found'});  
    }
}));


orderRoutes.get('/getorders/:id',expressasyncHandler(async(req,res)=>{

    try
    {
    
           const UserData=await User.findById(req.params.id)
            const orders=await Order.find({user:UserData});
            if(orders)
            {
                console.log(orders);
                res.status(200).send({orders:orders});
            }
            else
            {
                res.status(404).send({message:'No Order History found!!'});
            }
        
    }
    catch(err)
    {
        console.log('Error at the first try catch block',err);
        res.status(500).send({message:"Internal Server Error!!"}); 
    }

}))
module.exports=orderRoutes;