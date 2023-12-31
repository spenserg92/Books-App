/// Dependencies ///
const express = require('express') // import express framework
require('dotenv').config() // import/load ENV variables
const path = require('path') // import path module
const middleware = require('./utils/middleware')


/// Import Routers ///
const UserRouter = require('./controllers/userControllers')
const BookRouter = require('./controllers/bookControllers')
const ReviewRouter = require('./controllers/reviewsController')




/// Create App Object ///
const app = express() // Call the express function

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

/// Middleware ///


middleware(app)

/// Routes ///
// basic home route
app.get('/', (req, res) => {
    const { username, loggedIn, userId } = req.session
    // res.send('the app is connected')
    res.render('home.ejs', { username, loggedIn, userId })
})

app.use('/users', UserRouter)
app.use('/books', BookRouter)
app.use('/', ReviewRouter)


/// Server Listener ///

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('your server is runnning, better go catch it')
})

/// End ///