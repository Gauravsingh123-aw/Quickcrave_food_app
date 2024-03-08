const mongoose=require('mongoose')
require('dotenv').config()
//connecting to db

mongoose.connect(process.env.DB_URL)
.then(()=>console.log("database connected"))
.catch(err=>console.log("Error in db object",err));


//create user schema
const userschema=new mongoose.Schema({
    user_type:{
        type:String,
        required:[true,'user_type is required']
    },
    name:{
        type:String,
        required:[true,'User Full name is required']
    },
    username:{
        type:String,
        required:[true,'username is required']
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    email:{
        type:String
    },
    mobile:{
        type:Number
    },
    address:{
        type:String
    },
    cart:[{}],
    cart_history:[{}]
})

const sellerschema= new mongoose.Schema({
    user_type:{
        type:String,
        immutable: true,
        required:[true,'user_type is required']
    },
    name:{
        type:String,
        required:[true,'User full name is required']
    },
    username:{
        type:String,
        required:[true,'username is required']
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    email:{
        type:String
    },
    mobile:{
        type:Number
    },
    Address:{
        type:String
    }
})

const resschema=new mongoose.Schema({
    res_id:{
        type:String,
        required:[true,'res_id is required']
    },
    res_name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        maxlength:10,
        required:true
    },
    tagline:{
        type:String,
    },
    menu:[{}],
    orders:[{}],
    order_history:[{}]

}

)

const dishschema=new mongoose.Schema({
    menu_category:{
        type:String,
        required:true
    },
    dish_name:{
        type:String,
        required:true
    },
    food_preferance:{
        type:String,
        required:true
    },
    dish_price:{
        type:String,
        required:true
    },
    desc:{
        type:String
    },
    res_name:{
        type:String
    },
    profileImageUrl:{
        type:String
    },
})

//creating model for schemas

const User=mongoose.model('user',userschema)
const Seller=mongoose.model('seller',sellerschema)
const Res=mongoose.model('res',resschema)
const Dish=mongoose.model('dish',dishschema)

module.exports={User,Seller,Res,Dish};