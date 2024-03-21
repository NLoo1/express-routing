const express = require('express')
const router =  new express.Router();
const ExpressError = require('./expressError')

const ITEMS = [
    {"name": "popsicle", "price": 1.45},
    {"name": "cheerios", "price": 3.40}
]

router.get('/', (req,res) => {
    return res.json({items: ITEMS})
})


router.post('/', (req, res, next) => {
    // if(!req.body.name) throw new ExpressError()
    // console.log(req.json)
    const newItem = {name: req.body.name, price: req.body.price}
    ITEMS.push(req.body.name)
    return res.status(201).json({item: newItem})
})




module.exports = router