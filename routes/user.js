const express = require('express');
const mongoose = require('mongoose')
const User = require('../models/userModel');
const router = express.Router();
const {
    getUsers,
    getUser,
    postUser,
    updateUserAge,
    updateUserGoal,
    updateUserVeg
} = require('../controllers/userControllers')

// GET all users
router.get('/', getUsers);

// GET a single user by ID
router.get('/:id', getUser);

// POST a new user
router.post('/', postUser);

// UPDATE a user's age
router.patch('/:id/age', updateUserAge);

// UPDATE a user's goal
router.patch('/:id/goal', updateUserGoal);

// UPDATE a user's vegetarian preference
router.patch('/:id/vegetarian', updateUserVeg);

module.exports = router;
