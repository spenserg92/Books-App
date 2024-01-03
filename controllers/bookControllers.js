const express = require('express')
const Book = require('../models/book')
const User = require('../models/user')

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
            console.log('error', err)
            res.redirect(`/error?error=${err}`)
        })
})
// GET -> /books/mine
// displays user's saved books

router.get('/mine', (req, res) => {
    const { username, loggedIn, userId } = req.session
    Book.find({owner: userId})
        .then(userBooks => {
            res.render('books/mine', {books: userBooks, username, loggedIn, userId})
        })
        .catch(err => {
            console.log('error', err)
            res.redirect(`/error?error=${err}`)
        })
})

// //POST -> adds book to user's saved books
// router.post('/add', (req, res) => {
//     const { username, loggedIn, userId } = req.session;
//     const newBook = req.body;
//     newBook.owner = userId;
//     console.log('Look here', newBook)
//     Book.create(newBook)
//         .then(newBook => {
//             res.redirect('/books/mine')
//         })
//         .catch(err => {
//             console.log('error', err)
//             res.redirect(`/error?error=${err}`)
//         })
// })

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

router.put('/:id', async (req, res)=>{
    const { username, loggedIn, userId } = req.session
    const foundUser = await User.findOne({username})
    console.log('Look Here', req.params.id)
    console.log('here', req.params.id)
    foundUser.books.push(req.params.id)
    await foundUser.save()
    console.log('This is the user',foundUser)
    res.redirect('/books/mine')
})


module.exports = router