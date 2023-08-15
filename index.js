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

//jwt
const jwt = require('jsonwebtoken');

//db connection
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('database connected')
}


// verifyToken
server.use((req,res,next)=>{
    try{
        console.log('authorization')
    const token ='eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNzdGdzc2ZkYXNkc2V3YW9zc3NzdHdlc3RAc3Nzb2h1LmNvbSIsImlhdCI6MTY5MTkzOTk5Mn0.aQV8FSHFf7vvYhsBxlazJyr6JtbFI7oTnnEJoQRgU15lu8Mu3j56SgghuqWGHrPr7dINNIHVUYwj3z9vJYxIp5rWbTcfkjQ420x59sF5Fk9s-WRGcncu5AjXbDSryCqamk5qkPVqGmXww5ZzPdlRLLlxS2osrWA-Z47h1w5esAhgBzxqrmTTx0FS10DmbnlecnAhyz7lvBlarJ6nucsRyyi7CQTCEoxLfnUbprSprHQSyOwt16RWTYA3meHH-ljgE45SM5he5bjR0U9Xx3dij-yExDsiptN5svtkOhc1Wfn6P04TVoE58LTJTnL5q9UbBxC3OOh1tVG836W8vUouqw'
    console.log('Token:', token);
    var decoded = jwt.verify(token, publicKey);
    console.log('Decoded:', decoded); 
    if (decoded.email){
        next()
    }else{
        res.sendStatus(401)
    }
}
    catch(err){
    console.log(decoded)
    }
})





server.use(express.json());
// server.use(express.urlencoded());
server.use(morgan('default'));
server.use('/',authRouter.router);
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow sending cookies
};
server.use(cors(corsOptions));


server.listen(8080);
console.log(('server started'))