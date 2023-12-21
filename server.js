/// Dependencies ///
const express = require('express') // import express framework
require('dotenv').config() // import/load ENV variables
const path = require('path') // import path module
const middleware = require('./utils/middleware')


/// Import Routers ///




/// Create App Object ///
const app = express() // Call the express function

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

/// Middleware ///


middleware(app)

/// Routes ///
// basic home route
app.get('/', (req, res) => {
    res.send('the app is connected')
})


/// Server Listener ///

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('your server is runnning, better go catch it')
})

/// End ///