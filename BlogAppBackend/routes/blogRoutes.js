const express = require('express')
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:true}));
const jwt = require('jsonwebtoken');

function verifyToken(req,res,next){
    let token = req.headers.token;
    try{
        if(!token) throw 'Unauthorized access';
        else{
            let payload = jwt.verify(token,'blogApp');
            if(!payload) throw 'Unauthorized access';
            next();
        }
    }catch(error){
        console.log(error);
    }
}

const blogModel = require('../model/blogModel');

    //Read
    router.get('/',verifyToken,async (req,res) =>{
        try {
            const data = await blogModel.find()
            res.send(data);     
        } catch (error) {
             
        }
    })
    //Create
    router.post('/addblog',verifyToken,async (req,res) =>{
        try {
            const data = new blogModel(req.body);
            await data.save();
            res.send('Blog Added successfully');
        } catch (error) {
            res.send("Failed to add data")
        }
    })
    //update
    router.put('/updateblog/:id',verifyToken, async (req,res) => {
        try {
            const updatedblog = await blogModel.findByIdAndUpdate(req.params.id,req.body);
            if(!updatedblog){
               return res.send('Blog not found')
            }
            res.send("Blog updated successfully")
        } catch (error) {
            res.send('Failed to updated blog')
        }
    })
    //delete
    router.delete('/deleteblog/:id',verifyToken, async (req,res) =>{
        try {
            const deletedblog =await blogModel.findByIdAndDelete(req.params.id)
            if(!deletedblog){
                return res.send('Blog not found')
            }
            res.send('Blog deleted successfully')
        } catch (error) {
            res.send('Failed to delete Blog')
        }
    })

module.exports = router;