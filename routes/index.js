var express = require('express');
var router = express.Router();
const users = require("../models/user");
const bcrypt = require("bcrypt");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/login", async function (req, res, next) {
  try {
    let { password, username } = req.body;
    let user = await users.findOne({
      username: username,
    });
    if (!user) {
      return res.status(500).send({
        message: "login fail",
        success: false,
      });
    }
    
    // ตรวจสอบว่า status เป็น true หรือไม่
    if (!user.status) {
      return res.status(500).send({
        message: "login fail: account is inactive",
        success: false,
      });
    }
    
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(500).send({
        message: "login fail",
        success: false,
      });
    }
    
    const { _id, firstName, lastName, email, status } = user;
    return res.status(200).send({
      data: { _id, firstName, lastName, email, status },
      message: "login success",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "internal server error",
      success: false,
    });
  }
});


module.exports = router;
