const express = require('express');
const router = express.Router();

const { signup, signin, signout, googleLogin } = require('../controllers/auth');
const { userSignupValidator } = require('../validator');

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

router.post('/google-login', googleLogin);

module.exports = router;
