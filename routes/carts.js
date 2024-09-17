const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

// POST route to create or update cart item
router.post('/', async function (req, res, next) {
  try {
    const { name, description, price, imgUrl, quantity, category } = req.body;

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!name || !description || !price || !imgUrl || !quantity || !category) {
      return res.status(400).send({
        message: 'Missing required fields',
        success: false,
      });
    }

    // สร้างข้อมูลใหม่หรือแก้ไขข้อมูลที่มีอยู่แล้ว
    let cart = await Cart.findOne({ name });
    if (cart) {
      // หากมีสินค้าชื่อเดียวกันอยู่แล้ว ให้เพิ่ม quantity ไปยังข้อมูลชุดเดิม
      cart.quantity += 1;
      cart = await cart.save();
    } else {
      // สร้างข้อมูลใหม่หากยังไม่มีสินค้าชื่อนี้ในฐานข้อมูล
      cart = new Cart({
        name,
        description,
        category,
        price,
        imgUrl,
        quantity: 1, // กำหนดให้ quantity เป็น 1 เพราะเป็นสินค้าใหม่
      });
      cart = await cart.save();
    }

    // ส่งคืนข้อมูลและข้อความเพื่อยืนยันการสร้างหรือแก้ไขตะกร้าสินค้า
    return res.status(201).send({
      data: cart,
      message: 'Cart created or updated successfully',
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

// GET route to fetch all cart items
router.get('/', async function (req, res, next) {
  try {
    const carts = await Cart.find(); // Fetch all cart items from the database
    return res.status(200).json({
      data: carts,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

// DELETE route to remove a cart item by ID
router.delete('/:id', async function (req, res, next) {
  const { id } = req.params;
  try {
    const deletedCart = await Cart.findByIdAndDelete(id); // Find and delete cart item by ID
    if (!deletedCart) {
      return res.status(404).send({
        message: 'Cart item not found',
        success: false,
      });
    }
    return res.status(200).send({
      message: 'Cart item deleted successfully',
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});




// PUT route to update cart item by ID
router.put('/:id', async function (req, res, next) {
  const { id } = req.params;
  const { /* name, description, price, imgUrl, */ quantity/* , category  */} = req.body;

  try {
    // ตรวจสอบข้อมูลที่จำเป็น
    if (/* !name || !description || !price || !imgUrl || */ !quantity/*  || !category */) {
      return res.status(400).send({
        message: 'Missing required fields',
        success: false,
      });
    }

    const updatedCart = await Cart.findByIdAndUpdate(id, {
  /*     name,
      description,
      price,
      imgUrl, */
      quantity,
      /* category, */
    }, { new: true });

    if (!updatedCart) {
      return res.status(404).send({
        message: 'Cart item not found',
        success: false,
      });
    }

    return res.status(200).send({
      data: updatedCart,
      message: 'Cart item updated successfully',
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});


module.exports = router;
