const express = require('express');
const cors = require('cors')
const {connection} = require('./Configuration/db')

// Routes
const {authenticationRouter} = require('./Routes/authenticateRoutes')
const {userRouter} = require('./Routes/userRoutes');
const {clubRouter} = require('./Routes/clubRoutes')
const {productRouter} = require('./Routes/productRoutes')
const {planRouter} = require('./Routes/planRoutes')
const {orderRouter} = require('./Routes/orderRoutes')
const {membershipRouter} = require('./Routes/membershipRoutes')
require('dotenv').config()
const app = express();

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.status(200).send('Welcome to backend server of power house fitness club!')
})

// Routes
app.use('/auth',authenticationRouter);
app.use('/user',userRouter);
app.use('/clubs',clubRouter);
app.use('/products',productRouter);
app.use('/plans',planRouter);
app.use('/orders',orderRouter);
app.use('/memberships',membershipRouter)



// Server Connection
app.listen(process.env.PORT,async(req,res)=>{
    try {
        await connection;
        console.log('Mongo DB Connection Established on port 8000');
    } catch (error) {
        console.log('Error Connecting DB',error);
    }
})