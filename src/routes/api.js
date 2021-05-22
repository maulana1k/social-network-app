import express from 'express'
import multer from 'multer'

const API = express.Router()

//Controller
import UserController from '../controller/UserController.js'
import PostsController from '../controller/PostsController.js'
import CommentController from '../controller/CommentController.js'

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

API.get('/:username/profile',UserController.getProfile)

API.put('/:username/profile',profileMiddleware,UserController.updateProfile)

API.put('/:username/follow/:toUsername',UserController.follow)

API.put('/:username/follow/:toUsername',UserController.unfollow)

//Posts api
API.get('/posts?',PostsController.getPagination) 
//get post per page '?page=&limit='
API.get('/posts/:username',PostsController.getByUser)
 //get posts per user
API.get('/post/:postId',PostsController.getDetail)
 //post detail
API.post('/post',postMiddleware,PostsController.post)

API.put('/post/:postId',PostsController.edit)

API.delete('/post/:postId',PostsController.delete)

API.put('/post/:postId/likes/:username',PostsController.likes)

API.put('/post/:postId/unlikes/:username',PostsController.unlike)

//Comment api
API.put('/post/:postId/comment/:username',CommentController.post)

API.put('/post/:postId/uncomment/:commentId',CommentController.delete)


//Search api
API.get('/search',UserController.searchQuery)

//Notification api
API.get('/:username/notification',UserController.getNotification)
API.put('/:username/notification/push',UserController.pushNotification)

export default API