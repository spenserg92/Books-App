/// Schema and Dependencies ///

const mongoose = require('../utils/connection')

const {Schema, model} = mongoose

/// Schema Definition ///

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }]
})

/// Create User Model ///

const User = model('User', userSchema)


/// Export User Model ///

module.exports = User