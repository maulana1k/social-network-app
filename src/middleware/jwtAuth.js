import express  from 'express'
import jwt  from 'jsonwebtoken'
const SECRET_KEY = 'socialnetappwysiwyg'
import bcrypt from 'bcryptjs'
import User from '../db/UserModel.js'


export function authRegister  (req,res,next)  {
    console.log(req.body);
    User.findOne({
        username: req.body.username
    }).exec((err,user)=>{
        if (err) return
        if (user) return res.status(400).send('Username or email is already in use!')
    })
    User.findOne({
        email: req.body.email
    }).exec((err,user)=>{
        if (err) return 
        if (user) return res.status(400).send('Email or email is already in use!')
    }) 
    next()
}

export function verifyToken  (req,res,next) {
    let token = req.headers['x-access-token']
    if (!token) return res.status(403).send({msg:'no token'})
    jwt.verify(token,SECRET_KEY,(err,decoded)=>{
    if (err) return res.status(401).send({msg:'unauthorized'})
    
    req.userId = decoded.id      
    })
    next()
}