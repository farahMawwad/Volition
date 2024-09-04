const bcrypt = require("bcrypt");
const validator = require("validator");

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user_id:String,
    role: String,
    userEmail: String,
    passward: String,
    username: String,
    birthDay:String,
    img:String,
    typeDisability :String,
    cart:[{
      title: String,
      description: String,
      url:String,
      count:String,
      cost:String
    }]

});

UserSchema.statics.signup = async function (email, pass, passConfirm, name) {
  if ( !email ||   !pass ) {
    return "All fields must be filled";
  }
  if (!validator.isEmail(email)) {
    return "Email not valid";
  }
 
  
  if (!validator.isStrongPassword(pass)) {
    return "Password not strong enough" ;
  }
  
  if (pass !== passConfirm) {
    return "Passwordconfirm is not match";
  }
  
  const exists = await this.findOne({ userEmail: email });
  if (exists) {
    return "Email already in use";
  }
  if(email==='farahawwad@gmail.com'){
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pass, salt);
    const user = await this.create({userEmail:email,passward:hash,username:name, role: 0 });
    return user ;
  }
  
  const salt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash(pass, salt);
const user = await this.create({userEmail:email,passward:hash,username:name, role: 1, birthDay:"",img:"",
  typeDisability :"",cart:[]});

  return user;
};
UserSchema.statics.login = async function (email, pass) {
  if (!email && !pass) {
    return "All fields must be filled";
  }
  const user = await this.findOne({userEmail:email});
  if (!user) {
    return "Incorrect email";
  }
  const match = await bcrypt.compare(pass,user.passward);
  if (!match) {
    return "Incorrect password";
  }
  return user;
};
UserSchema.statics.veiwUser=async function (id) {
 try{

   const user = await this.findById(id);
   return user
 } 
catch{
  console.error('Error finding user by ID:', error);
    throw error;
}
}
UserSchema.statics.editUser=async function (id,username,birthDay,typeDisability,img) {
 try{
   const edit = await this.findByIdAndUpdate(
    id ,
    {
      username: username,
      birthDay:birthDay,
      typeDisability :typeDisability,
      img :img
    }
    ,
    {
      new:true
    }
   )
   return edit
 } 
catch{
  console.error('Error edit user by ID:', error);
    throw error;
}
}
UserSchema.statics.addCart=async function (id,title,description,url,cost,count) {
 try{
   const edit = await this.findByIdAndUpdate(
    id ,
    {
      $push: {
cart:[{
  id,
  title,
  description,
  url,
  cost,
  count
}]}
    }
    ,
    {
      new:true
    }
   )
   return edit
 } 
catch{
  console.error('Error edit user by ID:', error);
    throw error;
}
}
const User = mongoose.model('Users', UserSchema);  

module.exports = { User};