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
    try{
        if(!req.body.name) throw new ExpressError('Must include items', 400)
        const newItem = {name: req.body.name, price: req.body.price || 0}
        ITEMS.push(newItem)
        return res.status(201).json({item: newItem})
    }
    catch(e){
        next(e)
    }
})

router.get('/:name', (req, res, next) => {
    try{
        if(!req.params.name) throw new ExpressError('No name specified.', 400)
        const item = ITEMS.find(c => c.name == req.params.name )
        if(item === undefined) throw new ExpressError("cannot find item", 404)
        return res.json({item})
    } catch(e){
        next(e)
    }
    
})

// account for name and/or price
router.patch('/:name', (req,res,next) => {
    try{
        // Neither name nor price
        if(!req.body.name && !req.body.price) throw new ExpressError('No name or price specified.', 400)
        
        // Look for item based on either name or price
        const item = ITEMS.find(c => c.name == req.params.name)

        // if undefined throw error
        if(item === undefined) throw new ExpressError("cannot find item", 404)
        
        if(req.body.name){
            item.name = req.body.name
        }  
        if(req.body.price){
            item.price = req.body.price
        }
        return res.json({updated: {item: item}})
    } catch(e){
        next(e)
    }
})


router.delete("/:name", function (req, res, next) {
    try {
        const index = ITEMS.findIndex(c => c.name === req.params.name);
        if(index === -1) throw new ExpressError('Item not found', 400);
        ITEMS.splice(index, 1);
        return res.json({message: "Deleted"});
    } catch (e) {
        next(e);
    }
});


module.exports = router