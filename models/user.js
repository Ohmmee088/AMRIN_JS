//โค้ดนี้ใช้ Mongoose ซึ่งเป็น ODM (Object Data Modeling) สำหรับ MongoDB 
//เพื่อสร้าง Schema และ Model สำหรับผู้ใช้ (users) 
//โดยโค้ดนี้ประกอบด้วยการกำหนด Schema และการสร้าง Model 
//สำหรับผู้ใช้ ซึ่งจะใช้ในการทำงานกับฐานข้อมูล MongoDB ในแอปพลิเคชัน Express

const mongoose = require("mongoose")
const users = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    status: { type: Boolean , default : false},

});
//module.exports = mongoose.model("users" , users);



module.exports = mongoose.model('user', users);

