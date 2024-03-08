const multer = require('multer')
const cloudinary = require('cloudinary').v2;
const cloudinaryStorage = require('cloudinary-multer')
const fs=require('fs')
require('dotenv').config()
// require('dotenv').config()  //process.env

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
})

 //configure cloudinary storage
const storage = cloudinaryStorage({
    cloudinary:cloudinary
 })
  
 const upload = multer({storage:storage})

module.exports={upload,cloudinary};