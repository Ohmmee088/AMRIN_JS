var express = require('express');
var router = express.Router();
const User = require('../models/user'); // นำเข้าโมเดลผู้ใช้

// เส้นทางสำหรับอนุมัติผู้ใช้ตาม ID
router.put('/:id', async function (req, res, next) {
  try {
    const userId = req.params.id; // รับ ID ของผู้ใช้จากพารามิเตอร์ของเส้นทาง
    const user = await User.findById(userId);
    const status = true;


    if(!user) {
      return res.status(404).send({
        message: error.message,
        success: false,
      });
    }

    // สมมติว่าเรามีฟิลด์ 'approved' ในโมเดลผู้ใช้
    user.status = true;
    await user.save();

    return res.status(200).send({
      message: 'User approved successfully',
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: 'Internal server error',
      success: false,
    });
  }
});

module.exports = router;
