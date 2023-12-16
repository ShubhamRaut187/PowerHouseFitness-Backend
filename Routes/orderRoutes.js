const {Router} = require('express');
const {authenticate} = require('../Middlewares/authenticate');
const {OrderModel} = require('../Models/OrderModel');
const {authorize} = require('../Middlewares/authorize')

const orderRouter = Router();

orderRouter.get('/',authenticate,authorize,async(req,res)=>{
    try {
        const Orders = await OrderModel.find({});
        res.status(200).send({"Orders":Orders});
    } catch (error) {
        res.status(500).send({"Message":"Something Went Wrong","Error":error});
    }
})

orderRouter.get('/:id',authenticate,async(req,res)=>{
    const {id} = req.params;
    try {
        const Orders = await OrderModel.find({CustomerID:id});
        res.status(200).send({"Orders":Orders})
    } catch (error) {
        res.status(500).send({"Message":"Something Went Wrong","Error":error});
    }
})

orderRouter.post('/create',authenticate,async(req,res)=>{
    const {CustomerID,OrderBill,OrderStatus,Details} = req.body;
    try {
        const New_Order = new OrderModel({
            CustomerID,
            OrderBill,
            OrderStatus,
            Details
        });
        await New_Order.save();
        res.status(201).send({"Message":"Order added!","Order":New_Order});
    } catch (error) {
        res.status(500).send({"Message":"Something Went Wrong","Error":error});
    }
})

orderRouter.patch('/updateorder/:id',authenticate,authorize,async(req,res)=>{
    const Data = req.body;
    const {id} = req.params;
    try {
        const Order = await OrderModel.findOneAndUpdate({_id:id},Data,{new:true});
        res.status(200).send({"Message":"Order Updated!","Order":Order});
    } catch (error) {
        res.status(500).send({"Message":"Something Went Wrong","Error":error});
    }
})

module.exports = {
    orderRouter
}
