const express = require('express');
const router = new express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:true}));

const jwt=require('jsonwebtoken');

const userModel = require('../model/userModel');

router.post('/login', async(req,res)=>{
    const user=await userModel.findOne({email:req.body.email});
    if(!user){
        res.status(400).send({message:'User not found'});
    }
    try {
        if(user.password==req.body.password){
            const payload={email:user.email,password:user.password};
            const token=jwt.sign(payload,'blogApp');
            res.status(200).send({message:'Login successful',token:token});
        }
        else{
            res.status(400).send({message:'Invalid credentials'});
        }
    } catch (error) {
        console.log(error);
    }
})









module.exports = router;
