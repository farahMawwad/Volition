const jwt = require("jsonwebtoken");
const { User} = require("../models/models");

const createToken = (_id,role) => {
  return jwt.sign({_id ,role}, process.env.SECRET, { expiresIn: "3d" });
};
exports.signup = async (req, res) => {
  console.log(req.body);
  const { email, pass, passConfirm, name} = req.body;
  try {
    const result = await User.signup( email, pass, passConfirm, name);
    
    console.log(typeof result);
    if (typeof result === "object") {
      res.status(200).json({ email});
    } else {
      res.send(result);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.login = async (req, res) =>  
  {
    const {email,pass} = req.body;
    try {
      const user = await User.login(email, pass);
      if (typeof user === "object") {
        const token = createToken(user._id,user.role);
        res.status(200).json({token});
      } else {
        res.send(user);
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }}

    