const exp=require('express')
//creating mini express application
const resApp=exp.Router()
const expressAsyncHandler=require('express-async-handler')
const verifyToken = require('../Middlewares/Verifytoken');

let  {getResdata,sendResdata,addMenu,getHomedata,gettingOrder,addOrderHistory,orderRejection,gettingOrderHistory}=require('../Controllers/res_controller')
const { verify } = require('jsonwebtoken')

//getting res details for a particular seller
resApp.post('/res_details',expressAsyncHandler(getResdata))

// adding the res-details
resApp.post('/res_detail',expressAsyncHandler(sendResdata))

// adding the menu items in res data
resApp.post('/res_menuadd',expressAsyncHandler(addMenu));

//getting the restaurant detail for home page
resApp.get('/res_detail_home',expressAsyncHandler(getHomedata))


// getting orders from user upon checkout
resApp.post('/getting_order',expressAsyncHandler(gettingOrder));

//adding data to order_history of res
resApp.post('/adding_orderhistory',expressAsyncHandler(addOrderHistory))

//removing order from order schema of res
resApp.post('/order_rejection',expressAsyncHandler(orderRejection))

//getting data of order history of res based on seller username
resApp.post('/gettingOrderHistory',expressAsyncHandler(gettingOrderHistory))

//getting res data by res name




module.exports=resApp