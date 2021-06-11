const mongoose = require('mongoose');
const userModel = require('./models/User');

mongoose.connect('mongodb+srv://chaitu:Iamfine@420@cluster0.jk33l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to Database'))
.catch((err) => console.log(err));

let user = new userModel();
user.username = "Hemisphere";
user.password = "hcugdsfsd";
user.save();




