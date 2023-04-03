const mongoose=require('mongoose')


const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:3,
        max:50,
        unique:true
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique:true
    },
    password:{
        type:String,
        required:true,
        max:6,
    },
    profilePicture:{
        type:String,
        default:""
    },
    isAdmin:{
        type:Boolean,
        default:false,
        required:true,
    },
    wishlist:{
        type:Array,
        default:[]
    },
    cartItems:{
        type:Array,
        default:[]
    }
})
module.exports=mongoose.model('Users',UserSchema);