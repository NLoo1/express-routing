const express = require('express')
const itemRoutes = require('./itemRoutes')
const app = express();

app.use('/items', itemRoutes)

app.listen(3000, () => {
    console.log("Server started on port 3000")
})