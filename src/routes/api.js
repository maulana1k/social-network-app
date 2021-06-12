import express from 'express'
import multer from 'multer'
 
const API = express.Router()

//Controller
import UserController from '../controller/UserController.js'
import PostsController from '../controller/PostsController.js'
import CommentController from '../controller/CommentController.js'

//Middleware
import { authRegister ,verifyToken}  from '../middleware/jwtAuth.js'
import {avatarStorage,postStorage,fileFilter} from '../../fileStorage.js'


//User api
API.post('/auth/login',UserController.login)

API.post('/auth/register',authRegister,UserController.register)

API.post('/auth/reset-password')

API.get('/:username/profile',UserController.getProfile)

API.put('/:username/profile',verifyToken,multer({storage:avatarStorage,fileFilter:fileFilter,limits:{fileSize:2*1024*1024}}).single('avatar'),UserController.updateProfile)

API.put('/:username/follow/:toUsername',UserController.follow)

API.put('/:username/unfollow/:toUsername',UserController.unfollow)

//Posts api
API.get('/posts',PostsController.getPagination) 
//get post per page '?page=&limit='
API.get('/posts/:username',PostsController.getByUser)

API.get('/posts/:username/mentions',PostsController.getByMentions)
 //get posts per user
API.get('/post/:postId',PostsController.getDetail)
 //post detail
API.post('/post/:username',verifyToken,multer({storage:postStorage,fileFilter:fileFilter,limits:{fileSize:2*1024*1024}}).single('images'),PostsController.post)

API.put('/post/:postId',verifyToken,PostsController.edit)

API.delete('/post/:postId',verifyToken,PostsController.delete)

API.put('/post/:postId/likes/:username',PostsController.likes)

API.put('/post/:postId/unlikes/:username',PostsController.unlike)

//Comment api
API.put('/post/:postId/comment/:username',CommentController.post)

API.put('/post/:postId/replies/:commentId/by/:username',CommentController.replies_comment)

API.put('/post/:postId/uncomment/:commentId',CommentController.delete)


//Search api
API.get('/search',UserController.searchQuery)
API.get('/suggestion',UserController.suggestion)

//Notification api
API.get('/:username/notification',UserController.getNotification)

API.get('/testnotif/:postId/:username',CommentController.test)
API.post('/testing/post/:username',
		// multer({dest:'../../public/uploads'}).single('images'),
		multer({storage:postStorage,fileFilter:fileFilter,limits:{fileSize:2*1024*1024}}).single('images'),
		(req,res,next)=>{

		 return	res.send(`<img src="http://localhost:8080/${req.file.path}" />`)
		})
export default API

