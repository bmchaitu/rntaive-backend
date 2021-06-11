const express = require("express");
const userModel = require("./models/User");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.DB,{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to Database'))
.catch((err) => console.log(err));

app.post("/signup", async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(300).json({ message: "Password and Email is required" });
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (user) 
    return res.status(400).json({ "message": "Email already exists" });
    const pwd = await bcrypt.hash(req.body.password, 10);
    const newuser = await userModel();
    newuser.email = req.body.email;
    newuser.password = pwd;
    await newuser.save();
    return res.status(200).json({ "message": "User registered succesfully" });
  } 
  catch (error) {
      console.log(error);
    return res.status(500).json({"message":"Something is wrong"});
  }
});

app.post('/login', async (req,res) => {
    if(!req.body.email || !req.body.password)
    return res.status(400).json({"message":"Email and Password is required"});
    try{
        const user = await userModel.findOne({"email":req.body.email});
        if(!user)
        return res.status(400).json({"message":"Email/password does not exists"});    
        const result = await bcrypt.compare(req.body.password, user.password);
        if(result)
        {
            const token = jwt.sign(user.password,'12345');
            return res.status(200).json({"token":token, email:user.email});
        }

    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({"message":"Something is wrong"});
    }
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
