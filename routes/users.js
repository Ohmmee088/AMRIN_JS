var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const users = require("../models/user");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", async function (req, res, next) {
  try {
    let { password, username, firstName, lastName, email ,status } = req.body;
    let hashPassword = await bcrypt.hash(password, 10);
    const newUser = new users({
      username,
      password: hashPassword,
      firstName,
      lastName,
      email,
      status,
    });
    const user = await newUser.save();
    return res.status(200).send({
      data: {
        id: user._id,
        username,
        firstName,
        lastName,
        email,
        status,
      },
      message: "create success",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "create fail",
      success: false,
    });
  }
});

// แก้ไขฟังก์ชันการดึงข้อมูลผู้ใช้ทั้งหมด
router.get("/all", async function(req, res, next) {
  try {
    const allUsers = await users.find(); // ใช้ find() เพื่อดึงข้อมูลผู้ใช้ทั้งหมด
    return res.status(200).send({
      data: allUsers,
      message: "success",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "fail",
      success: false,
    });
  }
});

module.exports = router;
