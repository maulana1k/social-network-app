// const express = require('express')
import express from 'express'
const API = express.Router()
import multer from 'multer'

//Controller
import UserController from '../controller/UserController.js'
import ProfileController from '../controller/ProfileController.js'
import PostsController from '../controller/PostsController.js'

//Middleware
import { authRegister }  from '../middleware/jwtAuth.js'
import {avatarStorage,postStorage,fileFilter} from '../middleware/fileStorage.js'
const profileMiddleware = (req,res,next)=>{
    if (req.file) multer({storage:avatarStorage,fileFilter:fileFilter}).single('avatar')
    next()
}
const postMiddleware = (req,res,next)=>{
    if (req.file) multer({storage:postStorage,fileFilter:fileFilter}).single('images')
    next()
}

//User api
API.post('/auth/login',UserController.login)
API.post('/auth/register',authRegister,UserController.register)
API.post('/auth/reset-password')

//Profile api
API.get('/:userId/profile',ProfileController.get)
API.post('/:userId/profile',profileMiddleware,ProfileController.post)
API.put('/:userId/profile/edit',profileMiddleware,ProfileController.edit)

//Posts api
API.get('/posts?page=') //get post per page
API.get('/posts/:userId',PostsController.getByUser) //get posts per user
API.get('/post/:postId',PostsController.getDetail) //post detail
API.post('/post',postMiddleware,PostsController.post)
API.put('/post/:postId',PostsController.edit)
API.delete('/post/:postId',PostsController.delete)

//Comment api
API.get('/post/:postId/comments')
API.post('/post/:postId/comment')
API.delete('/post/:postId/comment/:commentId')

//Likes api
API.get('/post/:postId/likes')
API.post('/post/:postId/likes')
API.delete('/post/:postId/likes')

//Follow api
API.get('/:userId/follower')
API.get('/:userId/following')
API.post('/:userId/follow')
API.delete('/:userId/follow')

//Search api
API.get('/search/:query')

//Notification api
API.get('/:userId/notification')

export default API