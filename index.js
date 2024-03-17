const express=require('express');
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const userModel=require('./models/userModel')
mongoose.connect("mongodb://localhost:27017/nutrify")
.then(()=>{
    console.log("Database connectiion successfull");
})
.catch((err)=>{
 console.log(err);

})
const app=express();

app.post("/register",(req,res)=>{
    let user=req.body;

bcrypt.genSalt(10,(err,salt)=>{
    if(!err)
    {
        bcrypt.hash(user.password,salt,async (err,hpass)=>{
            if(!err)
            {
                user.password=hpass;
                try 
                {
                    let doc = await userModel.create(user)
                    res.status(201).send({message:"User Registered"})
                }
                catch(err){
                    console.log(err);
                    res.status(500).send({message:"Some Problem"})
                }
            }
        })
    }
})
})
app.listen(8000,()=>{
    console.log("server is up and running ");
})
