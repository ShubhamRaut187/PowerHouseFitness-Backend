const {Router} = require('express');
const {authenticate} = require('../Middlewares/authenticate');
const {ProductModel} = require('../Models/ProductModel');
const {authorize} = require('../Middlewares/authorize');

const productRouter = Router();

productRouter.get('/',authenticate,async(req,res)=>{
    try {
        const Products = await ProductModel.find({});
        res.status(200).send({"Products":Products});
    } catch (error) {
        res.status(500).send({"Message":"Something Went Wrong","Error":error});
    }
})

productRouter.get('/:id',authenticate,async(req,res)=>{
    const {id} = req.params;
    try {
        const Product = await ProductModel.findOne({_id:id});
        res.status(200).send({"Product":Product})
    } catch (error) {
        res.status(500).send({"Message":"Something Went Wrong","Error":error});
    }
})

productRouter.post('/create',authenticate,authorize,async(req,res)=>{
    const {Name,Category,Brand,Description,MRP,Price,Images,Tags} = req.body;
    try {
        const New_product = new ProductModel({
            Name,
            Category,
            Brand,
            Description,
            MRP,
            Price,
            Images,
            Tags
        });
        await New_product.save();
        res.status(201).send({"Message":"Product added!","Product":New_product});
    } catch (error) {
        res.status(500).send({"Message":"Something Went Wrong","Error":error});
    }
})

productRouter.patch('/updateproduct/:id',authenticate,authorize,async(req,res)=>{
    const Data = req.body;
    const {id} = req.params;
    try {
        const Product = await ProductModel.findOneAndUpdate({_id:id},Data,{new:true});
        res.status(200).send({"Message":"Product Updated!","Product":Product});
    } catch (error) {
        res.status(500).send({"Message":"Something Went Wrong","Error":error});
    }
})

productRouter.delete('/deleteproduct/:id',authenticate,authorize,async(req,res)=>{
    const {id} = req.params;
    try {
        const Product = await ProductModel.finOneAndDelete({_id:id});
        res.status(200).send({"Message":"Product Deleted","Product":Product});
    } catch (error) {
        res.status(500).send({"Message":"Something Went Wrong","Error":error});
    }
})


module.exports = {
    productRouter
}