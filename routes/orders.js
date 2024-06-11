const express = require('express');
const router = express.Router();
const Order = require('../models/order'); // นำเข้าโมเดลให้ถูกต้อง
const Product = require('../models/product'); // นำเข้าโมเดลให้ถูกต้อง
const mongoose = require('mongoose'); // นำเข้า mongoose


// เส้นทางในการสร้าง order ใหม่
router.post('/orders', async (req, res) => {
    const { productId, quantity } = req.body;
  
    // Log request body to check if productId is present
    console.log('Request body:', req.body);
  
    // Check the validity of productId and quantity
    if (!mongoose.Types.ObjectId.isValid(productId) || !Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({ error: 'Invalid product ID or quantity' });
    }
  
    try {
      // Check if the product exists
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Check if there is enough stock
      if (quantity > product.stock) {
        return res.status(400).json({ error: 'Not enough stock available' });
      }
  
      // Reduce stock based on quantity
      product.stock -= quantity;
      //await product.save();
      // อัปเดตข้อมูลสต็อกของสินค้า
        await Product.findOneAndUpdate();
     
      // Create order
      const order = new Order({
        productId: productId,
        quantity: quantity
      });
  
      const savedOrder = await order.save();
      res.status(201).json(savedOrder);
    } catch (error) {
      console.error('Error creating order:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
// เส้นทางในการแสดงรายการ order ทั้งหมด
router.get('/orders', async (req, res) => {
    try {
      // ค้นหารายการ order ทั้งหมดจากฐานข้อมูล
      const orders = await Order.find();
  
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching all orders:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });



  // เส้นทางในการแสดงรายการ Order ทั้งหมดของ Product ที่มี ID ที่กำหนด
router.get('/products/:id/orders', async (req, res) => {
    const productId = req.params.id;

    try {
      // ค้นหารายการ Order ทั้งหมดสำหรับผลิตภัณฑ์ที่มี ID ที่กำหนด
      const orders = await Order.find({ productId: productId }).populate("productId") ;
      console.log(orders)
      res.status(200).json(orders);
    } catch (error) {
      productIderror('Error fetching orders for product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


module.exports = router;
