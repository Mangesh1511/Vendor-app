require("./connection");
const express=require('express');
const dotenv=require('dotenv');
const axios=require('axios')
const mongoose=require('mongoose')
const helmet =require('helmet')
const morgan =require('morgan')
const bodyParser=require('body-parser')
const app=express()
const CookieParser=require('cookie-parser')
app.use(CookieParser());
app.use(bodyParser.urlencoded({extended:true}));
const {data}=require('./data');

const authRoute=require('./routes/auth')
const userRoute=require('./routes/user')
const dataRoute=require('./routes/data');
require('dotenv').config()

app.use(helmet());
app.use(morgan('common'));
app.use(express.json());

// app.use('/api/users', userRoute);
app.use('/routes/auth',authRoute);
// app.use('/api/posts',postRoute);
app.get('/',(req,res)=>{
    console.log('server');
})
console.log("server started");


app.get('/api/products',async(req,res)=>{
    res.send(data.products);
})

app.get('/api/products/slug/:slug',async(req,res)=>{
    console.log(data.products);

   

        const product=data.products.find((x)=>x.slug===req.params.slug);
        console.log('Product\n',product)
        if(product!=null && product !=undefined)
        {
            console.log('hi there');
            res.status(200).send(product);
        }
        else 
        res.status(404).send({message:'No Product Found'});
    
})
app.get('/api/products/:id',async(req,res)=>{
    console.log(data.products);

   

        const product=data.products.find((x)=>x._id===req.params.id);
        console.log('Product\n',product)
        if(product!=null && product !=undefined)
        {
            console.log('hi there');
            res.status(200).send(product);
        }
        else 
        res.status(404).send({message:'No Product Found'});
    
})

app.listen(5000,()=>{

    console.log('App is running on port no :5000\n');
})

