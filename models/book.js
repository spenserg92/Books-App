const mongoose = require('../utils/connection')

const { Schema, model } = mongoose

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
    imgCover: { type: String },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}

/// Create User Model ///

const Book = model('Book', bookSchema)


/// Export User Model ///

module.exports = Book