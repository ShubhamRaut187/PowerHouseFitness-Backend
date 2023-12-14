const express = require('express');
const cors = require('cors')
const app = express();

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.status(200).send('Welcome to backend server of power house fitness club!')
})

app.listen(8000,(req,res)=>{
    console.log('Server Started');
})