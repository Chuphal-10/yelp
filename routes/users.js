const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const user = require('../controllers/users')
router.get('/register', user.renderUser);

router.post('/register', catchAsync(user.createUser));

router.get('/login', user.login)

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), user.loginRoute)

router.get('/logout', user.logout)

module.exports = router;