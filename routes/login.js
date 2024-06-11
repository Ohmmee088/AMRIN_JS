var express = require('express');
var router = express.Router();

// ตัวอย่างข้อมูลผู้ใช้ที่เก็บไว้ในหน่วยความจำ
const users = [
    { username: 'user1', password: 'pass1' },
    { username: 'user2', password: 'pass2' }
]

// เส้นทางสำหรับ login
// router.post('/login', (req, res) => {
//     const { username, password } = req.body;

//     // ตรวจสอบข้อมูลผู้ใช้ั
//     const user = users.find(u => u.username === username && u.password === password);
    
//     if (user) {
//         if (user.status != true) {
//             res.status(401).json({ success: false, message: 'รอการอนุมัติ' });
//         } else {
//             res.json({ success: true, message: 'Login successful' });
//         }
//     } else {
//         res.status(401).json({ success: false, message: 'Invalid username or password' });
//     }
// });

module.exports = router;