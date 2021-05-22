import User  from '../db/UserModel.js'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
const SECRET_KEY = 'socialnetappwysiwyg'

const UserController = {

     register: (req,res,next)=> {
        let {username,email,password} = req.body
        let user = new User({
            username,
            email,
            password: bcryptjs.hashSync(password,8)
    })

        user.save((err,user)=>{
            if (err){
                console.log(err);
                return
            } 
            let token = jwt.sign({id:user._id},SECRET_KEY)
            res.json([{
                id: user._id,
                email: user.email,
                username: user.username,
                token
            },200])
            console.log(token,res)
            return
        })
    },

    login: (req,res,next)=>{
        User.findOne({
            username: req.body.username
        }).exec((err,user)=>{
            if (err) return 
            if (!user) return 
            let passwordValid = bcryptjs.compareSync(
                req.body.password,user.password)
            console.log(passwordValid);
            if (!passwordValid) return 
            let token = jwt.sign({id:user._id},SECRET_KEY,{
                expiresIn: 86400
            })
            res.json([{
                id: user._id,
                email: user.email,
                username: user.username,
                token
            },200])
            return
        })
    },
    updateProfile: (req,res,next)=>{
        let avatar = req.file? req.file.path : ''
        let {fullname,bio,phone} = req.body
        
        User.findOneAndUpdate(
            {username: req.params.username},
            {$set:{
                profile:{fullname,avatar,bio,phone}
            }},
            {new:true},
            (err,result)=>{
                if (err) return
                return res.json(result)
            }
        )
    },
    getProfile:(req,res,next)=>{
        User.findOne({username : req.params.username})
            .exec((err,result)=>{
                if (err) throw err
                return res.json(result.profile)
            })
    },
    follow:(req,res,next)=>{
        let {username,toUsername} = req.params
        //follower on target user
        let resData = []
        User.findOneAndUpdate(
            {username: username},
            {$push:{
                follower: {username:toUsername}
            }}
            ).exec((err,result1)=>{
                if (err) throw err
                resData.push(result1)
                console.log(result1)
            })
        //following on subject user
        User.findOneAndUpdate(
            {username:toUsername},
            {$push:{
                following:{username:username}
            }}
            ).exec((err,result2)=>{
                if (err) throw err
                resData.push(result2)
                res.json(resData)
                resData = []
                return 
            })
            console.log(resData)
    },
    unfollow:(req,res,next)=>{
        let {username,toUsername} = req.params
        let resData = []
        User.findOneAndUpdate(
            {username:username},
            {$pull:{
                follower: {username:toUsername}
            }}
            ).exec((err,result1)=>{
                if (err) throw err
                resData.push(result1)
            })
            
        User.findOneAndUpdate(
            {username:toUsername},
            {$pull:{
                following:{username:username}
            }}
            ).exec((err,result2)=>{
                if (err) throw err
                resData.push(result2)
            })
        
        return res.json(resData)
    },
    searchQuery:(req,res,next)=>{
        User.find({
            username:{$regex: `${req.query.username}` }
        }).exec((err,result)=>{
            if (err) throw err
            console.log(result)
            return res.json(result)
        })
    },
    getNotification:(req,res,next)=>{
        User.findOne({ username: req.params.username })
            .exec((err,result)=>{
                if (err) throw err
                return res.json(result.notification)
            })
    },
    pushNotification:(req,res,next)=>{
        User.findOneAndUpdate(
            {username: req.params.username},
            {$push:{
                notification:{
                    notif_message:req.body.notification
                }
            }},
            {new:true}
            ).exec((err,result)=>{
                if (err) throw err
                return res.json(result)
            })
    },
    resetPassword: (req,res,next)=>{
        
    }
}
export default UserController