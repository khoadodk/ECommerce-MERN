const express = require('express');
const router = express.Router();

const { create } = require('../controllers/category');

//middleware routes
const { userById } = require('../controllers/user');
const { requireSignin, isAdmin, isAuth } = require('../controllers/auth');

router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);

//run the middleware finduserById when there is a param of :userId
router.param('userId', userById);

module.exports = router;
