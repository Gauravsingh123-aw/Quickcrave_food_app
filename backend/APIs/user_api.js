const exp=require('express')
//creating mini express application
const userApp=exp.Router()
const expressAsyncHandler=require('express-async-handler')

const {getUserData,addUser,removeUser,addtoCart_User,removeCart_User,userLogin,updateUser,order_history,delete_Cart,tokenHandle}=require('../Controllers/user_controller');
const verifyToken = require('../Middlewares/Verifytoken');

//getting user data by username
userApp.post('/users',verifyToken,expressAsyncHandler(getUserData));


//adding User
userApp.post('/user',expressAsyncHandler(addUser));

//user Login
userApp.post('/user-login',expressAsyncHandler(userLogin))

//removing User
userApp.post('/user-delete',expressAsyncHandler(removeUser));

//updating user info
userApp.post('/user-update',verifyToken,expressAsyncHandler(updateUser))


//add products to cart of user
userApp.post('/user-addcart',expressAsyncHandler(addtoCart_User));

//remove products from cart  of user
userApp.post('/user_removecart',expressAsyncHandler(removeCart_User));

// maintaining the cart(order) history of user
userApp.post('/user_order_history',expressAsyncHandler(order_history))

// deleting the whole cart data upon checkout
userApp.post("/delete_Cart",expressAsyncHandler(delete_Cart))

userApp.post("/token_verify",verifyToken,expressAsyncHandler(tokenHandle));

module.exports=userApp

