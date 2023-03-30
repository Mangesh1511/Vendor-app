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


app.listen(5000,()=>{

    console.log('App is running on port no :5000\n');
})