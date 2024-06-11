

const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// เส้นทางสำหรับเพิ่มสินค้า
router.post('/products', async function (req, res, next) {
    try {
      const { name, description, price, category, stock } = req.body;
  
      // ตรวจสอบว่าข้อมูลที่จำเป็นถูกส่งมา
      if (!name || !price || !category || !stock) {
        return res.status(400).send({
          message: 'Missing required fields',
          success: false,
        });
      }
  
      // ตรวจสอบว่าสินค้ามีอยู่ในฐานข้อมูลหรือไม่
      let existingProduct = await Product.findOne({ name });

      if (existingProduct) {
        // หากสินค้ามีอยู่แล้ว ให้เพิ่มเฉพาะ stock
        existingProduct.stock += stock;
        await existingProduct.save();

        return res.status(200).send({
          data: existingProduct,
          message: 'Product stock updated successfully',
          success: true,
        });
      } else {
        // สร้างผลิตภัณฑ์ใหม่
        const newProduct = new Product({
          name,
          description,
          price,
          category,
          stock,
        });

        // บันทึกผลิตภัณฑ์ลงในฐานข้อมูล
        const product = await newProduct.save();
  
        // ส่งผลลัพธ์กลับไป
        return res.status(201).send({
          data: product,
          message: 'Product created successfully',
          success: true,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: error.message,
        success: false,
      });
    }
});




router.put('/products/:id', async (req, res) => {
  try {
    let { name, description , price , category , stock } = req.body;
    const productId = req.params.id;
    
    // ตรวจสอบข้อมูลที่ส่งมา
    if (!stock || !productId|| !name || !description || !price || !category ) {
      return res.status(400).send({
        message: 'Missing required fields',
        success: false,
      });
    }


    
    // ค้นหาสินค้าที่ต้องการอัปเดต
    const product = await Product.findByIdAndUpdate(productId, {  name, description , price , category , stock  }, { new: true }); // แก้ไขการอัปเดตข้อมูลเพียงเฉพาะ stock เท่านั้น

    // ตรวจสอบว่าพบสินค้าหรือไม่
    if (!product) {
      return res.status(404).send({
        message: 'Product not found',
        success: false,
      });
    }

    // ส่งคำตอบกลับ
    return res.status(200).send({
      data: product,
      message: 'Product updated successfully',
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: 'Internal server error',
      success: false,
    });
  }
});


  

  router.delete('/products/:id', async (req, res) => {
    try {
      const productId = req.params.id;
  
      // ตรวจสอบว่ามี ID สำหรับสินค้าที่ต้องการลบหรือไม่
      if (!productId) {
        return res.status(400).send({
          message: 'Missing product ID',
          success: false,
        });
      }
  
      // ลบสินค้าจากฐานข้อมูล
      const deletedProduct = await Product.findByIdAndDelete(productId);
  
      // ตรวจสอบว่ามีสินค้าที่ถูกลบหรือไม่
      if (!deletedProduct) {
        return res.status(404).send({
          message: 'Product not found',
          success: false,
        });
      }
  
      // ส่งคำตอบกลับ
      return res.status(200).send({
        data: deletedProduct,
        message: 'Product deleted successfully',
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'Internal server error',
        success: false,
      });
    }
  });



 // ดึงข้อมูลสินค้าทั้งหมดจากฐานข้อมูล
  router.get('/products', async (req, res) => {
    try {
      // ดึงข้อมูลสินค้าทั้งหมดจากฐานข้อมูล
      const products = await Product.find();
  
      // ตรวจสอบว่ามีสินค้าหรือไม่
      if (!products.length) {
        return res.status(404).send({
          message: 'No products found',
          success: false,
        });
      }
  
      // ส่งข้อมูลสินค้ากลับไปในคำตอบ
      return res.status(200).send({
        data: products,
        message: 'Products retrieved successfully',
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'Internal server error',
        success: false,
      });
    }
  });

  


  //แสดง 1 product
  router.get('/products/:id', async (req, res) => {
    try {
      const productId = req.params.id;
  
      // ค้นหาสินค้าโดยใช้ ID
      const product = await Product.findById(productId);
  
      // ตรวจสอบว่าพบสินค้าหรือไม่
      if (!product) {
        return res.status(404).send({
          message: 'Product not found',
          success: false,
        });
      }
  
      // ส่งข้อมูลสินค้ากลับไปในคำตอบ
      return res.status(200).send({
        data: product,
        message: 'Product retrieved successfully',
        success: true,
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
