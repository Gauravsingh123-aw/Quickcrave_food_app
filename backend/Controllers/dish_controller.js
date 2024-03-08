const { Dish } = require('../db')
const { cloudinary } = require('../APIs/dish_api')


//getting dish data
async function getDishdata(req, res) {
    let ans = await Dish.find()
    res.status(201).send({ message: "dish Data", payload: ans });
}

//adding dish data
async function addDishdata(req, res) {
    let data = JSON.parse(req.body.userobj);
    let insert= data.menu;

    // assigning  cdn link
    insert.profileImageUrl = req.file.url;
    
    let reply = await Dish.create(insert);

    res.status(201).send({ message: "dish added", payload: reply });
}

//deleting the dish data
async function deleteDish(req, res) {
    let data = req.body
    let ans = await Dish.findOneAndDelete({ res_id: data.res_id });
    res.status(201).send({ message: "dish deleted successfuly", payload: ans })
}

// filter all the data by their category
async function getdatabyCategory(req, res) {
    let data = req.body
    let ans = await Dish.find({ menu_category: data.data })
    res.status(200).send({ message: "dish acc to category", payload: ans })
}

module.exports = { getDishdata, addDishdata, deleteDish, getdatabyCategory };