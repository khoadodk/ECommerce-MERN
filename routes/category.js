const express = require('express');
const router = express.Router();

const {
  getAll,
  read,
  remove,
  update,
  create,
  categoryById
} = require('../controllers/category');

//middleware routes
const { userById } = require('../controllers/user');
const { requireSignin, isAdmin, isAuth } = require('../controllers/auth');

//CRUD methods
router.get('/categories', getAll);
router.get('/category/:categoryId', read);
router.put(
  '/category/:categoryId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  update
);
router.delete(
  '/category/:categoryId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);

//run the middleware finduserById when there is a param of :userId
router.param('userId', userById);
router.param('categoryId', categoryById);

module.exports = router;
