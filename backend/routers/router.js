const express = require("express");
const router = express.Router();
const userController = require("../controller/controller.js");
const verifyToken = require('../middleware/verifyToken.js');
router.route("/signup").post(userController.signup);
router.route("/login").post(userController.login);
router.route('/test').post(verifyToken, (req, res) => {
    res.json({authData:req.authData});
  });

module.exports = router;