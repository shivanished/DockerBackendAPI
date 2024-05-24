const User = require('../models/userModel')
const mongoose = require('mongoose')

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users' });
    }
}

const getUser = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) { 
            return res.status(400).json({ message: 'No such user' })
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user' });
    }
}

const postUser = async (req, res) => {
    const { username, password, age, goal, vegetarian, email } = req.body;
    try {
        const newUser = new User({ username, password, age, goal, vegetarian, email });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error });
    }
}

const updateUserAge = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) { 
            return res.status(400).json({ message: 'No such user' })
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.age = req.body.age;
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Error updating age', error });
    }
}

const updateUserGoal = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) { 
            return res.status(400).json({ message: 'No such user' })
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.goal = req.body.goal;
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Error updating goal', error });
    }
}

const updateUserVeg = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) { 
            return res.status(400).json({ message: 'No such user' })
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.vegetarian = req.body.vegetarian;
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Error updating vegetarian preference', error });
    }
}

module.exports = {
    getUsers,
    getUser,
    postUser,
    updateUserAge,
    updateUserGoal,
    updateUserVeg
}