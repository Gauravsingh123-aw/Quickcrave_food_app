const bcryptjs = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Seller } = require('../db')


//getting seller data
async function getSellerData(req, res) {
    let sellerList = await Seller.find()
    if (sellerList.length !== 0) {
        res.status(200).send({ message: "user data", payload: sellerList })
    }
    else {
        res.status(200).send({ message: "seller Data not found" })
    }
}

//adding seller data
async function addSeller(req, res) {
    let data = req.body
    let ans = await Seller.find({ username: data.username })

    if (ans.length !== 0) {
        return res.send({ message: "seller already exists" })
    }
    else {
        if (data.password !== null) {
            let hashed = await bcryptjs.hash(data.password, 3);
            data.password = hashed;
            let sellerdata = await Seller.create(data);
            res.status(201).send({ message: "seller created", payload: sellerdata })
        }
        else {
            res.send({ message: "enter password data" })
        }
    }
}


//seller login
async function sellerLogin(req, res) {
    let data = req.body
    //searching in user collection
    let seller = await Seller.findOne({ username: data.username });

    // if invalid username is found
    if (seller === null) {
        return res.status(200).send({ message: "Invalid Username" });
    }

    //if username is correct then matching password
    const result = await bcryptjs.compare(data.password, seller.password);

    //if password is not matched
    if (result == false) {
        return res.status(200).send({ message: "Invalid password" });
    }

    //create jwt token and sign it
    const signedToken = jwt.sign(
        { username: seller.username },
        'abcdefgh',
        { expiresIn: "1d" }
    );

    res.status(200).send({ message: "Login success", token: signedToken, user: seller })
}

//seller update
async function sellerUpdate(req, res) {
    const data = req.body
    const ans = await Seller.findOneAndUpdate({ username: data.username }, { ...data });
    if (ans !== null) {
        res.status(200).send({ message: "user updated", payload: ans })
    }
    else {
        res.status(200).send({ message: "user not found" })
    }
}

//handling the token
async function tokenHandle(req,res){
    let data=req.body
    console.log("data",data)
    let ans=await Seller.findOne({username:data.username});
    res.status(200).send({message:"token verification done",user:ans});
}



module.exports = { getSellerData, addSeller, sellerLogin, sellerUpdate ,tokenHandle}