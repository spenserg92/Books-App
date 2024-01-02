const express = require('express')
const Book = require('../models/book')

const router = express.Router()
//GET -> /Index
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

// GET -> /books/new
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

//CREATE -> add book to index
router.post('/', (req, res) => {
    const { username, loggedIn, userId } = req.session;
    const newBook = req.body;
    newBook.owner = userId;

    Book.create(newBook)
        .then(newBook => {
            res.redirect('/books/new')
        })
        .catch(err => {
            console.log('error')
            res.redirect(`/error?error=${err}`)
        })
})


// SHOW - Show more info about one book

router.get('/:id', (req, res) => {
    const { username, loggedIn, userId } = req.session
    Book.findById(req.params.id)
    .then((result) => {
        res.render('books/show', { book: result, username, userId, loggedIn} )
    })
    .catch(err => {
        console.log('error', err)
        res.redirect(`/error?error=${err}`)
    })
})


module.exports = router