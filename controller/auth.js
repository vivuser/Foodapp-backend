const jwt = require('jsonwebtoken');
const model = require('../model/user');
const User = model.User;
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt')
const privateKey = fs.readFileSync(path.resolve(__dirname,'../private.key'), 'utf-8')

exports.createUser = (req, res) => {
    console.log('Request Body:', req.body);
    const user = new User(req.body);
    var token = jwt.sign({ email: req.body.email}, privateKey,{algorithm:'RS256',});
    const hash = bcrypt.hashSync(req.body.password, 10);
    user.token = token;
    user.password = hash
    return user.save()
        .then(savedUser => {
            console.log('Saved User:', savedUser);
            // Respond with a successful status and the saved user data
            res.status(201).json({token});
        })
        .catch(error => {
            console.log('Error:', error);
            // Handle errors and respond with an error status
            res.status(500).json({ error: 'An error occurred while saving the user.' });
        });
};

exports.login = async (req, res) => {

    try{
        console.log('Login Request Body:', req.body);
        const doc = await User.findOne({email:req.body.email})
        const isAuth = bcrypt.compareSync(req.body.password, doc.password);
        if(isAuth){
            console.log('Authentication Successful');
            var token = jwt.sign({ email: req.body.email}, privateKey,{algorithm:'RS256',});
            doc.token = token;
            doc.save()
            res.json({email:req.body.email,token})
        }else{
            console.log('Authentication Failed');
        res.sendStatus(401)
    }
}catch(err){
    console.log('Error:', err);
        res.status(401).json(err)
    }

    
};

