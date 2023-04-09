const mongoose=require('mongoose');
const orderSchema=new mongoose.Schema(
    {
        orderItems:[
            {
                slug:{type:String,required:true},
                name:{type:String,required:true},
                quantity:{
                    type:Number,required:true
                },
                image:{type:String,reqiured:true},
                price:{type:Number,required:true},
                product:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'Product',
                    required:true,
                },
            },
        ],
        shippingAddress:{
            fullName:{type:String,required:true},
            address:{type:String,required:true},
            cityName:{type:String,required:true},
            postalCode:{type:String,required:true},
            country:{type:String,required:true}, 
            
        },
        paymentMethod:{
            type:String,required:true
        },
        paymentResult:{
            id:String,
            status:String,
             update_time:String,
            email_address:String,
        },
        itemsPrice:{type:Number,required:true},
        shippingPrice:{type:Number,required:true},
        taxPrice:{type:Number,required:true},
        totalPrice:{type:Number,required:true},
        user:{type:mongoose.Schema.Types.ObjectId,ref:'Users',required:true},
        isPaid:{type:Boolean,default:false},
        paidAt:{type:Date},
        isDelivered:{type:Boolean,default:false},
        delieverdAt:{type:Date},
 
    },
    {
        timestamps:true,
    }
);

module.exports= mongoose.model('Order',orderSchema)