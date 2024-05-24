const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
    min: 0
  },
  goal: {
    type: String,
    required: true,
    trim: true
  },
  vegetarian: {
    type: Boolean,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'is invalid']
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
