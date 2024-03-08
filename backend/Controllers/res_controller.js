const { Res } = require('../db')

// getting the Res data  --working
async function getResdata(req, res) {
    // expecting username of seller

    let data = req.body;
    let ans = await Res.find({ username: data.username });
    res.send({ message: "res data", payload: ans })
}

// adding the new Res data  --working
async function sendResdata(req, res) {
    let data = req.body

    //search for existing user
    let search = await Res.find({ res_id: data.res_id });
    if (search.length == 0) {

        let ans = await Res.create(req.body);
        res.status(201).send({ message: "Res data saved", payload: ans })
    }
    else {
        res.status(200).send({ message: "Restaurant already exists!" })
    }
}

// adding the menu items in Restaurant Details
async function addMenu(req, res) {
    let data = req.body
    // console.log(data)
    let ans = await Res.findOneAndUpdate({ res_name: data.rname }, { "$push": { menu: data.m } })
    res.status(200).send({ message: "menu added", payload: ans })
}

// getting restaurant data for the home page without any filters
async function getHomedata(req, res) {
    let ans = await Res.find()
    res.status(200).send({ message: "res data", payload: ans });
}

// getting order details from user upon final checkout to save in order of res
async function gettingOrder(req, res) {
    let data = req.body
    // console.log(data.cart);
    
    for (let i = 0; i < data.cart.length; i++) {
        let setData={
            username:data.username,
            id:data.cart[i]._id,
            order:data.cart[i]
        }
        let ans =await Res.findOneAndUpdate({ res_name: data.cart[i].res_name }, {"$push":{orders:setData}})
    }
    res.status(200).send({message:"order received"})
}

//saving data to order_history of res
async function addOrderHistory(req,res){
    let data=req.body
    let ans=await Res.findOneAndUpdate({res_name:data.ord.order.res_name},{"$push":{order_history:data.ord}});
    res.status(200).send({message:"order history added"});
}

//removing data from order of res upon rejection from seller
async function orderRejection(req,res){
    let data=req.body
    // console.log(data.order.order.res_name)
    let ans=await Res.findOneAndUpdate(
        { 'orders.order._id': data.order.order._id},
        { "$pull": { orders: { id: data.order.id } } },
        { new: true }
      )
    // let ans=await Res.findOneAndDelete({username:uname },{"$pull":{order:{_id:id}}})
    res.send({message:"deleted the order from order",payload:ans})
}


//getting data of order history of res based on seller username
async function gettingOrderHistory(req,res){
    let data=req.body
    let ans=await Res.find({username:data.username})
    res.status(200).send({message:"order_history data",payload:ans})
}



module.exports = { getResdata, sendResdata, addMenu, getHomedata, gettingOrder ,addOrderHistory,orderRejection,gettingOrderHistory};

