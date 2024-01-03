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
// POST Signup -> /users/signup

router.post('/signup', async (req, res) => {
    const { username, loggedIn, userId } = req.session
    const newUser = req.body

    newUser.password = await bcrypt.hash(newUser.password, await bcrypt.genSalt(10))

    User.create(newUser)
    .then(user => {
        res.redirect('/users/login')
    })
    .catch(error => {
        console.log('error')
        res.send('Something went wrong...')
    })
})

// GET -> login
router.get('/login', (req, res) => {
    const { username, loggedIn, userId } = req.session
    
    res.render('users/login',{ username, loggedIn, userId })
})

// POST -> login

router.post('/login', async (req, res) => {
    const { username, password } = req.body

    User.findOne({username})
    .then(async(user) => {
        if (user){
            const result = await bcrypt.compare(password, user.password)
            if (result){
                req.session.username = username
                req.session.loggedIn = true
                req.session.userId = user.id

                res.redirect('/')
            }else{
                res.send('something went wrong, no pw match')
            }
        }else {
            res.send('something went wrong, no user with that name')
        }
    })
    .catch(error => {
        console.log('error')
        res.send('Something went wrong...')
    })
})

// GET -> Logout /users/logout
router.get('/logout', (req, res) => {
    const { username, loggedIn, userId } = req.session
    
    res.render('users/logout',{ username, loggedIn, userId })
})

router.delete('/logout', (req, res) =>{
    req.session.destroy( ()=> {
        res.redirect('/')
    })

})




/// Export Router /// 
module.exports = router