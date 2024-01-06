const express = require('express')
const Book = require('../models/book')
const User = require('../models/user')


const router = express.Router()

router.post('/reviews/:id', async (req, res) => {
    const { username, loggedIn, userId } = req.session;
    const book = await Book.findById(req.params.id).populate('reviews')
    const newReview = req.body;
    newReview.reviewer = await User.findById(userId)
    console.log('this is the book', book)


    book.reviews.push(newReview);
    try{
        await book.save();
    } catch (err) {
        console.log(err)
    }
    res.redirect(`/books/${book.id}`)
})


module.exports = router