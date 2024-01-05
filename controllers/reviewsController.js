const express = require('express')
const Book = require('../models/book')
const User = require('../models/user')
const router = express.Router()

router.post('/:id/reviews', async (req, res) => {
    const book = await Book.findById(req.params.id)
    req.body.user = req.user._id
    req.body.userName = req.user.userName

    book.reviews.push(req.body);
    try{
        await book.save();
    } catch (err) {
        console.log(err)
    }
    res.redirect(`/books/${book._id}`)
})





module.exports = router