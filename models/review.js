// /// Schema and Dependencies ///

// const mongoose = require('../utils/connection')

// const {Schema, model} = mongoose

// const reviewSchema = {
//     reviewer: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     book: {type: Schema.Types.ObjectId,
//         ref: 'Book',
//         required: true},
//     review: {
//         type: String,
//     },
//     rating: {
//         type: Number,
//         min: 1,
//         max: 5
//     },
//     hasRead: {
//         type: Boolean,
//     }
// }



// const Review = model('Review', reviewSchema)


// /// Export User Model ///

// module.exports = Review