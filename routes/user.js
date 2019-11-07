const express = require('express');
const router = express.Router();

const {
  signup,
  signin,
  signout,
  requireSignin
} = require('../controllers/user');
const { userSignupValidator } = require('../validator');

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.post('/signout', signout);

module.exports = router;
