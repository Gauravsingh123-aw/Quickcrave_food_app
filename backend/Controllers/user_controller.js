const bcryptjs = require('bcrypt')
const jwt = require('jsonwebtoken')
//importing collections from db.js
require('dotenv').config()

const { User } = require('../db')

//getting users data
async function getUserData(req, res) {
    let data=req.body
    const userList = await User.findOne({username:data.username})
    res.status(200).send({ message: "users data fetched", payload: userList });
}


//adding a new user 

async function addUser(req, res) {
    let data = req.body;

    //search if user exists
    let search = await User.find({ username: data.username });
    if (search.length === 0) {
        if (data.password !== null) {
            let hashed = await bcryptjs.hash(data.password, 3);
            data.password = hashed

            let ans = await User.create(data)
            res.status(201).send({ message: "User created", payload: ans })
        }
        else {
            res.send({ message: "enter password data" })
        }
    }
    else {
        res.status(200).send({ message: "User already exists!" })
    }

}


//user Login
async function userLogin(req, res) {
    let data = req.body
    //searching in user collection
    let user = await User.findOne({ username: data.username });

    // if invalid username is found
    if (user === null) {
        return res.status(200).send({ message: "Invalid Username" });
    }

    //if username is correct then matching password
    const result = await bcryptjs.compare(data.password, user.password);

    //if password is not matched
    if (result == false) {
        return res.status(200).send({ message: "Invalid password" });
    }

    //create jwt token and sign it
    const signedToken = jwt.sign(
        { username: user.username },
        process.env.SECRET_KEY,
        { expiresIn: "1d" }
    );

    res.status(200).send({ message: "Login success", token: signedToken, user: user })
}

//updating user data
async function updateUser(req, res) {
    const data = req.body;
    const ans = await User.findOneAndUpdate({ username: data.username }, {$set:data},{new:true});
    if (ans !== null) {
        res.status(200).send({ message: "user updated", payload: ans })
    }
    else {
        res.status(200).send({ message: "user not found" })
    }
}

//deleting the user account
async function removeUser(req, res) {
    let data = req.body
    let ans = await User.findOneAndDelete({ username: data.username });

    if (ans != null) {
        return res.send("user deleted")
    }
    res.send("user not found");
}

//adding data to cart property of user
async function addtoCart_User(req, res) {
    let data = req.body
    //see the cart property note
    let a = await User.findOneAndUpdate({ username: data.username }, { "$push": { cart: data.cart } });
    if (a.length !== 0) {
        res.send({ message: "Product added to cart" });
    }
}


//removing data from cart property of User
async function removeCart_User(req, res) {
    let data = req.body
    let a = await User.findOneAndUpdate({ username: data.username }, { "$pull": { cart: {_id: data.dish_id } } })
    res.send({ message: "Product removed from the cart",payload:a })
}


// maintaining the order or cart history of user
async function order_history(req,res){
    let data=req.body
    let ans;

    for(let i=0;i<data.cart.length;i++){
    ans= await User.findOneAndUpdate({username:data.username},{"$push":{cart_history:data.cart[i]}})
    }
    res.send({payload:ans})
}

// deleting the whole cart data upon final checkout
async function delete_Cart(req,res){
    let data=req.body
    let ans=await User.findOneAndUpdate({username:data.username},{cart:[]})
    res.status(200).send({message:"checkout succeeded",payload:ans});
}


//handling the token
async function tokenHandle(req,res){
    let data=req.body
    console.log("data",data)
    let ans=await User.findOne({username:data.username});
    res.status(200).send({message:"token verification done",user:ans});
}

module.exports = { getUserData, addUser, removeUser, addtoCart_User, removeCart_User, userLogin, updateUser ,order_history,delete_Cart,tokenHandle};