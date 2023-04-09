require("./connection");
const express=require('express');
const dotenv=require('dotenv');
const axios=require('axios')
const mongoose=require('mongoose')
const helmet =require('helmet')
const morgan =require('morgan')

const app=express()
const CookieParser=require('cookie-parser')
app.use(CookieParser());
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:true}));
const {data}=require('./data');

const authRoute=require('./routes/auth')
const userRoutes=require('./routes/userRoutes')
const productRoutes=require('./routes/productRouter');
const seedRoutes=require('./routes/seedRouter');
const orderRoutes=require('./routes/orderRoutes');
require('dotenv').config()

app.use(helmet());
app.use(morgan('common'));
app.use(express.json());

// app.use('/api/users', userRoute);
app.use('/routes/auth',authRoute);
app.use('/api/products/seed',seedRoutes);
app.use('/api/products/',productRoutes);
app.use('/api/user',userRoutes);
app.use('/api/orders',orderRoutes);

app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message});
})

app.get('/api/keys/paypal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID||'sb');
})
// app.use('/api/posts',postRoute);
app.get('/',(req,res)=>{
    console.log('server');
})
console.log("server started");







app.listen(5000,()=>{

    console.log('App is running on port no :5000\n');
})

