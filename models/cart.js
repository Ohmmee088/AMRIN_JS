const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  name: {type: String,required: true,},
  
  description: {type: String,required: true,},
  price: {type: Number,required: true,},
  category: {type: String,required: true,},
/*   stock: {type: Number,required: true,},
 */  imgUrl: {type: String,required: true,},
  quantity: {type: Number,required: true,}
});

// Middleware สำหรับตรวจสอบการเพิ่ม quantity ให้กับสินค้าที่มีชื่อเดียวกัน
cartSchema.pre('save', async function(next) {
  const existingProduct = await this.constructor.findOne({ name: this.name });
  if (existingProduct) {
    // หากมีสินค้าชื่อเดียวกันอยู่แล้ว ให้เพิ่ม quantity ไปยังข้อมูลชุดเดิม
    this.quantity = existingProduct.quantity + 1;
  }
  next();
});

module.exports = mongoose.model('Cart', cartSchema);
