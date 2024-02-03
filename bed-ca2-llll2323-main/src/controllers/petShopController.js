const model = require('../models/petShopModel');


module.exports.getAllShop  = (req,res,next) => {
    const callback = (error,results,fields) => {
        if (error) {
            console.log(error)
        } else {
            res.status(201).json(results)
        }
    }
    model.allItems(callback)
}

module.exports.createNewItem = (req,res,next) => {
    const data = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        type: req.body.type
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create item.' }); 
        } else {
            res.status(201).json({ message: 'Item created successfully.', itemId: results.insertId });
        }
    };
    model.createItem(data,callback)
    }
