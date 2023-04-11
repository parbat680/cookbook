const express= require('express');
const path = require('path');
const bodyParser= require('body-parser')
const recepie= require('./schema/recepie');

const mongoose =require("mongoose");
require("dotenv").config();

const ConnectionDB =async ()=>{
    try {
        mongoose.connect(process.env.DATABASE_URL)
    } catch (error) {
      console.log(error)  
     
    }
}




const app= express();

ConnectionDB();

app.set('view engine','ejs')

app.use(express.static(__dirname + '/views/recipe-book'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


app.get('/', async(req, res) => {
    const recipes=await recepie.find();
    console.log(recipes)
    res.render('recipe-book/index.ejs',{recipes});
})

app.post('/recepie/add', async(req,res)=> {
    console.log(req.body)
    try {
        var data= recepie({
            name: req.body.name,
            method: req.body.method,
            ingredients: req.body.ingredients,
        })

        var result= await data.save();
        
    } catch (error) {
        console.log(error);
    }

    return res.json({'data':result})
})


app.listen(3001,()=> {
    console.log("connected")
})
