const express=require('express')
const Product =require('../models/productModel')
const productRouter=express.Router();

productRouter.get('/',async(req,res)=>{

    const product= await Product.find({});
    res.send(product);

})
productRouter.get('/slug/:slug',async(req,res)=>{

        const product=await Product.findOne({slug:req.params.slug});
        console.log('Product\n',product)
        if(product!=null && product !=undefined)
        {
            console.log('hi there');
            res.status(200).send(product);
        }
        else 
        res.status(404).send({message:'No Product Found'});
    
})
productRouter.get('/:id',async(req,res)=>{
    // console.log(data.products);

   

        const product=await Product.findById(req.params.id);
        console.log('Product\n',product)
        if(product)
        {
            console.log('hi there');
            res.status(200).send(product);
        }
        else 
        res.status(404).send({message:'No Product Found'});
    
})
module.exports=productRouter