const express = require('express');
const router = express.Router();

const {
  read,
  create,
  productById,
  update,
  remove
} = require('../controllers/product');

//middleware routes
const { userById } = require('../controllers/user');
const { requireSignin, isAdmin, isAuth } = require('../controllers/auth');

// CRUD Methods
router.get('/product/:productId', read);
router.put(
  '/product/:productId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  update
);
router.delete(
  '/product/:productId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);

//run the middleware finduserById when there is a param of :userId
router.param('userId', userById);
router.param('productId', productById);

module.exports = router;
