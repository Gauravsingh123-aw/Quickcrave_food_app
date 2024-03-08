const expressAsyncHandler = require("express-async-handler")

const exp=require('express')
const sellerApp=exp.Router()

const {getSellerData,addSeller,sellerLogin,sellerUpdate,tokenHandle}=require('../Controllers/seller_controller')

const verifyToken = require('../Middlewares/Verifytoken');
//getting sellers data
sellerApp.get('/sellers',expressAsyncHandler(getSellerData));

//adding seller
sellerApp.post('/seller',expressAsyncHandler(addSeller));

//seller login
sellerApp.post('/seller-login',expressAsyncHandler(sellerLogin));

//seller update
sellerApp.post('/seller-update',expressAsyncHandler(sellerUpdate));

// token verify
sellerApp.post("/token_verify",verifyToken,expressAsyncHandler(tokenHandle));


module.exports=sellerApp