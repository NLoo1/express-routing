const express = require('express')
const itemRoutes = require('./itemRoutes')
const app = express();

app.use(express.json())

app.use('/items', itemRoutes)

app.use((req,res,next) => {
    const e = new ExpressError("Page not found", 404)
    next(e)
})

app.use((err, req, res, next) => {
    let status = err.status || 500
    let message = err.msg 
    return res.status(status).json({
        error: {message, status}
    })
})

module.exports = app

