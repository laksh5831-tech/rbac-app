const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  role: {
    type: String,
    enum: ['admin', 'manager', 'member'],
    default: 'member',
  },
  status: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);