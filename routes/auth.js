const express = require('express');
const router = express.Router();

const {
  signup,
  signin,
  signout,
  googleLogin,
  forgotPassword,
  resetPassword
} = require('../controllers/auth');
const {
  userSignupValidator,
  forgotPasswordValidator,
  resetPasswordValidator
} = require('../validator');

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

router.put('/forgot-password', forgotPasswordValidator, forgotPassword);
router.put('/reset-password', resetPasswordValidator, resetPassword);

router.post('/google-login', googleLogin);

module.exports = router;
