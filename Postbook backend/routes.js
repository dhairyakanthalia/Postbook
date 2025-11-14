const express = require('express');
const { route } = require('express/lib/application');
const Model = require('./Model/signupModel');
const postModel = require('./Model/postModel')
const router = express.Router()

router.post('/signup', async (req,res) =>{
    try{
        const users = new Model({
            fname : req.body.fname,
            lname : req.body.lname,
            email : req.body.email,
            user : req.body.user,
            password : req.body.password,
            cpassword : req.body.password
        })
        const saveUser = await users.save();
        console.log(saveUser);
        res.status(200).json(saveUser);
    }
    catch(error){
        res.status(400).json({message : error.message})
    }
})

router.post('/post', async(req, res) => {
    const data = new postModel({
        username : req.body.username,
        userid : req.body.userid,
        text : req.body.text,
        img : req.body.img,
        likes : req.body.likes,
        dislikes : req.body.dislikes,
        comments: req.body.comments
    })
    
    try{
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    }
    catch(error){
        res.status(400).json({message : error.message})
    }
})


router.get('/getUsers', async (req,res)=>{
    try{
        const data = await Model.find();
        res.status(200).json(data);
    }
    catch(e){
        res.status(500).json({message : e.message})
    }
})

router.get('/getAllPost', async (req,res)=>{
    try{
        const data = await postModel.find();
        res.status(200).json(data);
    }
    catch(e){
        res.status(500).json({message : e.message})
    }
})




module.exports = router;