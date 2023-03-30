const mongoose=require('mongoose');
mongoose.set('strictQuery',true);
mongoose.connect("mongodb+srv://Mangesh:ZF1ElpwcFmweeAKN@cluster0.kl7teuz.mongodb.net/Appdata",(err)=>
{
    // ?retryWrites=true&w=majority
    if(!err)
        console.log("Mongodb Connection Succeeded...");
    else
        console.log("Connection Error: "+JSON.stringify(err,undefined,2));
    
});

module.exports=mongoose;

// mongodb://localhost:27017