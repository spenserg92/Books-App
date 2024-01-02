const express = require('express')
const Book = require('../models/book')

const router = express.Router()

router.get('/',(req, res) => {
    const { username, loggedIn, userId } = req.session
    Book.find()
        .then(result => {
            res.render('books/index', { books: result, username, userId, loggedIn})
        })
        .catch(err => {
            console.log('error')
            res.redirect(`/error?error=${err}`)
        })
} )

router.get('/new', (req, res) => {
    const { username, loggedIn, userId } = req.session;
    Book.find()
    .then(result => {
        res.render('books/new', { books: result, username, userId, loggedIn});
    })
    .catch(err => {
        console.log('error')
        res.redirect(`/error?error=${err}`)
    })
});





module.exports = router