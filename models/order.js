


const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number },
  // Add other fields as necessary
});
module.exports = mongoose.model('Order', orderSchema);
