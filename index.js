require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const server = express();
const path = require('path');
const fs = require('fs')
const publicKey = fs.readFileSync(path.resolve(__dirname,'./public.key'),'utf-8')

//authRouter
const authRouter = require('./routes/auth')

//orderRouter
const orderRouter = require('./routes/order')

//orderStatusRouter
const orderStatusRouter = require('./routes/orderStatus')

//authonCo
const authOnCoRouter = require('./routes/authonCo')

//verifyOTP
const verifyOTPRouter = require('./routes/verifyOTP')

//forgotPassword
const passwordRouter = require('./routes/password')

//passwordReset
const passResetRouter = require('./routes/passwordReset')

//getOrdersHistory
const orderHistoryRouter =  require('./routes/orderList')

//addressRouter
const addressRouter = require('./routes/address')

//jwt
const jwt = require('jsonwebtoken');

//db connection
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('database connected')
}

const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow sending cookies
};
server.use(cors(corsOptions));


// verifyToken

server.use('/', orderHistoryRouter)

server.use((req,res,next)=>{
    try{
        console.log('Authorization')
        const token = req.get('Authorization').split('Bearer ')[1];
        console.log('Token:', token);
    var decoded = jwt.verify(token, publicKey);
    console.log('Decoded:', decoded); 
    if (decoded.email){
        next()
    }else{
        res.status(401)
    }
}
    catch(err){
    console.log(decoded)
    res.status(401).json()
    }
})


server.use(express.json());
// server.use(express.urlencoded());
server.use(morgan('default'));
server.use(orderRouter.router);
server.use('/',authRouter.router);
server.use('/order-status',orderStatusRouter);
server.use('/', authOnCoRouter.router);
server.use('/', verifyOTPRouter.router)
server.use('/', passwordRouter)
server.use('/', passResetRouter)
server.use('/', addressRouter)

server.listen(8080);
console.log(('server started'))