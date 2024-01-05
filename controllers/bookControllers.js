const express = require('express')
const Book = require('../models/book')
const User = require('../models/user')

const router = express.Router()
//GET -> /Index
router.get('/', (req, res) => {
    const { username, loggedIn, userId } = req.session
    Book.find()
        .then(result => {
            res.render('books/index', { books: result, username, userId, loggedIn })
        })
        .catch(err => {
            console.log('error')
            res.redirect(`/error?error=${err}`)
        })
})

// GET -> /books/new
router.get('/new', (req, res) => {
    const { username, loggedIn, userId } = req.session;
    Book.find()
        .then(result => {
            res.render('books/new', { books: result, username, userId, loggedIn });
        })
        .catch(err => {
            console.log('error')
            res.redirect(`/error?error=${err}`)
        })
});

//CREATE -> add book to index
router.post('/', (req, res) => {
    const { username, loggedIn, userId } = req.session;
    const theBook = req.body;
    theBook.owner = userId;

    Book.create(theBook)
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

router.get('/mine', async (req, res) => {
    const { username, loggedIn, userId } = req.session
    const user = await User.findById(userId).populate('books')
    Book.find({ _id: { $in: user.books } })
        .then(userBooks => {
            res.render('books/mine', { books: userBooks, username, loggedIn, userId })
        })
        .catch(err => {
            console.log('error', err)
            res.redirect(`/error?error=${err}`)
        })
})

//POST -> adds book to user's saved books
router.post('/add', async (req, res) => {
    const { username, loggedIn, userId } = req.session;
    const newBook = req.body;
    const user = await User.findById(userId).populate('books')
    // console.log(user.books.length, newBook.id)
    user.books.push(newBook.id)
    user.books = Array.from(new Set(user.books))
    await user.save()
    res.redirect('/books/mine')
})

// SHOW - Show more info about one book

router.get('/:id', async (req, res) => {
    const { username, loggedIn, userId } = req.session
    const user = await User.findById(userId)
    Book.findById(req.params.id)
        .then((result) => {
            res.render('books/show', { book: result, user: user, username, userId, loggedIn })
        })
        .catch(err => {
            console.log('error', err)
            res.redirect(`/error?error=${err}`)
        })
})

// UPDATE ->/books/update/:id
router.put('/update/:id', (req, res) => {
    const { username, loggedIn, userId } = req.session
    const bookId = req.params.id
    const updatedBook = req.body
    delete updatedBook.owner
    updatedBook.owner = userId

    Book.findById(bookId)
        .then(foundBook => {
            if (foundBook.owner == userId) {
                return foundBook.updateOne(updatedBook)
            } else {
                res.redirect(`/error?error=You%20Are%20Not%20Allowed%20to%20Update%20this%20Place`)
            }
            res.redirect(`/books/${bookId}`)
        })
        .catch(err => {
            console.log('error', err)
            res.redirect(`/error?error=${err}`)
        })

})

// Delete -> /books/delete

router.delete('/delete/:id', (req, res) => {
    const { username, loggedIn, userId } = req.session
    const bookId = req.params.id
    Book.findById(bookId)
        .then(book => {
            if (book.owner == userId) {
                console.log("deleted book")
                return book.deleteOne()

            } else {
                res.redirect(`/error?error=You%20Are%20Not%20Allowed%20to%20Delete%20this%20Book`)
            }
        })
        .then(deletedBook => {
            res.redirect('/books')
        })
        .catch(err => {
            console.log('error')
            res.redirect(`/error?error=${err}`)
        })
})

// DELETE -> /books/remove
// removes a book from users list

router.delete('/remove/:id', async (req, res) => {
    const { username, loggedIn, userId } = req.session;
    const newBookId = req.params.id
    const user = await User.findById(userId)
    const i = user.books.indexOf(newBookId)
    if (i != -1) {
        user.books.splice(i,1)
    }
        
    user.books = Array.from(new Set(user.books))
    await user.save()
    res.redirect('/books/' + newBookId)
})


module.exports = router