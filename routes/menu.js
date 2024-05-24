const express = require('express');
const Menu = require('../models/menuModel'); 
const router = express.Router();
const {
  getMenus,
  getMenu,
  getLatestMenu,
  postMenu,
  updateMenu,
  deleteMenu
} = require('../controllers/menuControllers')

// GET all menus
router.get('/', getMenus);

// GET a single menu by ID
router.get('/:id', getMenu);

// GET latest menu
router.get('/latest', getLatestMenu);

// POST a new menu
router.post('/', postMenu);

// UPDATE a menu by ID
router.patch('/:id', updateMenu);

// DELETE