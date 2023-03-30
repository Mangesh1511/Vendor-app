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
    quantity:{
        type:Number,
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
    picture:{
        type:String,
        default:""
    },
    numReviews:{
        type:Number,
        required:true
    }

})

module.exports=mongoose.model('Products',ProductSchema);