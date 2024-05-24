const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a nested schema for foods within each meal period
const foodItemSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

// Define the schema for each meal period, which includes an array of food items
const mealPeriodSchema = new Schema({
  period: {
    type: String,
    required: true,
    enum: ['Break