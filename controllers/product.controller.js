const Product = require('../models/product.model');
const logger = require('../logger/logger');

exports.findAll = async(req, res) => {
    console.log('Find all products');
    try {
        const result = await Product.find();
        res.status(200).json({data: result});
        logger.info("Success in reading all products")
    } catch (err) {
        console.log(`Problem in reading products, ${err}`);
        logger.error(`Problem in reading all products, ${err}`);
    }    
}

exports.findOne = async(req, res) => {
    console.log('Find a product');
    const productId = req.params._id;
    try {
        const response = await Product.findOne({id: productId});
        res.status(200).json({data: response});    
    } catch (err) {
        console.log(`Problem in reading product, ${err}`);
    }    
}

exports.create = async(req, res) => {
    console.log('Insert product');

    console.log(req.body);

    const newProduct = new Product({
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity
    });

    try {
        const result = await newProduct.save();
        res.status(200).json({data:result})
        console.log('Product saved');
    } catch(err) {
        res.status(400).json({data: err})
        console.log('Problem in saving product');
    }
}

exports.update = async(req, res) => {
    const productId = req.params._id;
    console.log('Update product with id:', productId);

    const updateProduct = {
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity
    };

    try {
        const result = await Product.findOneAndUpdate(
            {id:productId},
            updateProduct,
            {new: true}
        );
        res.status(200).json({data:result})
        console.log('Successful product update:', productId);
    } catch(err) {
        res.status(400).json({data: err})
        console.log('Problem in updating product:', productId);
    }
}

exports.delete = async(req, res) => {
    const productId = req.params._id;
    console.log('Delete product with id:', productId);
    try {
        const result = await Product.findOneAndDelete({id:productId})
        res.status(200).json({data: result});
        console.log('Product deleted succesfully', productId);
    } catch (err) {
        res.status(400).json({data: err});
        console.log('Problem deleting product');
        
    }
}