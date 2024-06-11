



const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  //productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock : { type: Number },
});

module.exports = mongoose.model('Product', productSchema);
