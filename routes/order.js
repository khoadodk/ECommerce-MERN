const express = require('express');
const router = express.Router();

const { requireSignin, isAuth } = require('../controllers/auth');
const { userById, addOrderToUserHistory } = require('../controllers/user');
const { create } = require('../controllers/order');

router.post(
  '/order/create/:userId',
  requireSignin,
  isAuth,
  addOrderToUserHistory,
  create
);

router.param('userId', userById);
module.exports = router;
