/// Import Dependencies ///
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')


/// Create Router ///

const router = express.Router()

/// Routes + controllers ///

// GET -> SignUp
router.get('/signup', (req, res) => {
    const { username, loggedIn, userId } = req.session
    
    res.render('users/signup',{ username, loggedIn, userId })
})
// POST Signup

// GET -> login
router.get('/login', (req, res) => {
    const { username, loggedIn, userId } = req.session
    
    res.render('users/login',{ username, loggedIn, userId })
})
// GET -> Logout /users/logout
router.get('/logout', (req, res) => {
    const { username, loggedIn, userId } = req.session
    
    res.render('users/logout',{ username, loggedIn, userId })
})
/// Export Router /// 
module.exports = router