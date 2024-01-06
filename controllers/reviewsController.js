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

// DELETE -> Delete review

router.delete('/reviews/delete/:bookId/:reviewId', async (req, res) =>{
    const { username, loggedIn, userId } = req.session;
    const reviewId = req.params.reviewId
    const book = await Book.findById(req.params.bookId).populate('reviews')
    const i = book.reviews.map(review => review._id.toString()).indexOf(reviewId)
    if (i != -1 && book.reviews[i].reviewer == userId) {
        const review = book.reviews[i]
        book.reviews.splice(i,1)
        await book.save()
        await review.deleteOne()
    }
    res.redirect('/books/' + book._id)
})
module.exports = router