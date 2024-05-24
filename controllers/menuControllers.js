const Menu = require('../models/menuModel')
const mongoose = require('mongoose')

const getMenus = async (req, res) => {
    try {
        const menus = await Menu.find();
        res.status(200).json(menus);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving menus' });
    }
}

const getMenu = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) { 
            return res.status(400).json({ message: 'No such menu' })
        }

        const menu = await Menu.findById(req.params.id);
        if (!menu) {
            return res.status(404).json({ message: 'Menu not found' });
        }
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving menu' });
    }
}

const getLatestMenu = async (req, res) => {
    try {
        const latestMenu = await Menu.findOne().sort({ createdAt: -1 });
        if (!latestMenu) {
            return res.status(404).json({ message: 'No menus found' });
        }
        res.status(200).json(latestMenu);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching the latest menu', error });
    }
}


const postMenu = async (req, res) => {
    const { time, diningHall, foods } = req.body;
    try {
        const newMenu = new Menu({ time, diningHall, foods });
        await newMenu.save();
        res.status(201).json(newMenu);
    } catch (error) {
        res.status(400).json({ message: 'Error creating menu', error });
    }
}

const updateMenu = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) { 
            return res.status(400).json({ message: 'No such menu' })
        }

        const menu = await Menu.findById(req.params.id);
        if (!menu) {
            return res.status(404).json({ message: 'Menu not found' });
        }

        Object.keys(req.body).forEach(key => {
            menu[key] = req.body[key];
        });

        await menu.save();
        res.status(200).json(menu);
    } catch (error) {
        res.status(400).json({ message: 'Error updating menu', error });
    }
}

const deleteMenu = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) { 
            return res.status(400).json({ message: 'No such menu' })
        }

        const menu = await Men