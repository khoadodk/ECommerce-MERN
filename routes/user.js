const express = require('express');
const router = express.Router();

const { requireSignin, isAdmin, isAuth } = require('../controllers/auth');

const { userById, read, update } = require('../controllers/user');

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile
  });
});
// CRUD routes
router.get('/user/:userId', requireSignin, isAuth, read);
router.put('/user/:userId', requireSignin, isAuth, update);

//run the middleware finduserById when there is a param of :userId
router.param('userId', userById);

module.exports = router;
