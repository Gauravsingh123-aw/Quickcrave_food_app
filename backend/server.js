const exp=require('express')
const cors=require('cors')
require('dotenv').config()

//creating the epxress app
const app= exp()


const path=require('path') //for connecting the frontend

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// app.use(exp.static(path.join(__dirname,'/dist')))
app.use(cors())


//body parser middleware
app.use(exp.json())

const userApp=require('../backend/APIs/user_api')
const resApp=require('../backend/APIs/res_api')
const dishApp=require('../backend/APIs/dish_api')
const sellerApp=require('../backend/APIs/seller_api')

app.use('/user-api',userApp);
app.use('/res-api',resApp)
app.use('/dish-api',dishApp)
app.use('/seller-api',sellerApp)


// app.use((req,res,next)=>{
//     res.sendFile(path.join(__dirname,'../project/dist/index.html'))
// })


//error handler middleware
app.use((err,req,res,next)=>{
    res.send({message:err.message,payload:"Error occured"})
})

// In your server.js or middleware file




//assigning on port no 400
let port=process.env.PORT || 4000
app.listen(port,()=>{console.log("port running on 4000")});



