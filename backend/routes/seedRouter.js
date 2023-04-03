// const express=require('express')
const seedRouter=require('express').Router();
const Product =require( '../models/productModel')
const {data }=require( '../data');

seedRouter.post('/',async(req,res)=>{
    console.log('IN the seed router insert request\n');
    console.log('Data is: ',data);
    console.log('-------------------');
    
    try
    {
     await Product.remove({});

        const createdProducts=await Product.insertMany(data.products);
        res.status(200).send(createdProducts);
    }   
    catch(err)
    {
        console.log('Error in Seed Router Insert Many request\n',err);
        res.status(404).send({message:"Couldn't Add data due to Error Contact Admin !!"});
    }
       
})

module.exports=seedRouter;