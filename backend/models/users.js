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