const mongoose=require('mongoose')

const ProductSchema=new mongoose.Schema({

    name:{
        type:String,
        unique:true,
        required:true
    },
    slug:{
        type:String,
        unique:true,
        required:true
    },
    pquantity:{
        type:Number,
        default:0,
        required:true
    },
    vendor:
    {
        type:String,
        required:true

    },
    rating:{
        type:Number,
        default:0,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:""
    },
    image:{
        type:String,
        default:""
    },
    numReviews:{
        type:Number,
        required:true
    }

})

module.exports=mongoose.model('Products',ProductSchema);