require('dotenv').config()
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) =>{
    try {

        const authHeader = req.headers['authorization'];
        if(!authHeader){
            throw 'user não logado'
        }

        const token = authHeader.split(" ")[1];
        jwt.verify(token, )
        
    } catch (error) {
        
    }
}

module.exports = authMiddleware;