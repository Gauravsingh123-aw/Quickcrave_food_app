const exp=require('express')
const dishApp=exp.Router()
//creating a mini express
const expressAsyncHandler=require('express-async-handler')

const {upload}=require('../Middlewares/cloudinary_1')



const{getDishdata,addDishdata,deleteDish,getdatabyCategory}=require('../Controllers/dish_controller')

// getting all the dish data
dishApp.get('/dish_data',expressAsyncHandler(getDishdata));

// adding data to dish schema
dishApp.post('/add_dish_data',upload.single('image'),expressAsyncHandler(addDishdata));

//deleting the dish data
dishApp.post('/delete_dish',expressAsyncHandler(deleteDish));

// getting the data by category
dishApp.post('/getdataby_category',expressAsyncHandler(getdatabyCategory))



module.exports=dishApp