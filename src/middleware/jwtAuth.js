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
        if (err) return res.status(500).send(err)
        if (user) return res.status(400).send('Username is already in use!')
    })
    User.findOne({
        email: req.body.email
    }).exec((err,user)=>{
        if (err) return res.status(500).send(err)
        if (user) return res.status(400).send('Email is already in use!')
    }) 
    next()
}

export function verifyToken  (req,res,next) {
    let token = req.headers['authorization']
    if (!token) return res.status(403).send('no token')
    // let authToken = token && token.split(' ')[1]
    jwt.verify(token,SECRET_KEY,(err,user)=>{
        if (err) return res.status(401).send('unauthorized')
        req.user = user      
    })
    next()
}