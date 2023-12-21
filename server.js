/// Dependencies ///
const express = require('express') // import express framework
require('dotenv').config() // import/load ENV variables
const path = require('path') // import path module



/// Import Routers ///




/// Create App Object ///
const app = express() // Call the express function



/// Middleware ///




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