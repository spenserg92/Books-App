const mongoose = require('../utils/connection')

const { Schema, model } = mongoose


const reviewSchema = new Schema ({
    reviewer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    review: {
        type: String,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
})


const bookSchema = {
    title: {
        type: String,
        required: true,
    },
    genre: { type: String },
    author: {
        type: String,
        required: true,
    },
    publishedDate: { 
        type: Date,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviews: [reviewSchema]
}

/// Create User Model ///

const Book = model('Book', bookSchema)


/// Export User Model ///

module.exports = Book