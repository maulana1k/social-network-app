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
            res.json(user)
            return
        })
    },

    login: (req,res,next)=>{
        User.findOne({
            username: req.body.username
        }).exec((err,user)=>{
            if (err) throw err
            if (!user) return res.status(400).send('Wrong password or username!')
            let passwordValid = bcryptjs.compareSync(
                req.body.password,user.password)
            console.log(passwordValid);
            if (!passwordValid) return res.status(400).send('Wrong password or username!')
            let token = jwt.sign({id:user._id},SECRET_KEY,{
                expiresIn: 86400
            })
            res.json(user)
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
                if (!user) return res.status(404).send('user not found!')
                let {profile,username,follower,following} = result
                return res.json({profile,username,follower,following})
            })
    },
    follow:(req,res,next)=>{
        let {username,toUsername} = req.params
        //follower on target user
        let resData = []
        let notif_message =  'started to following you'
        User.findOneAndUpdate(
            {username: username},
            {$push:{
                follower: {username:toUsername},
                notification:{
                    subject:username,
                    puspose:toUsername,
                    notif_type:'follow',
                    notif_message : notif_message
                }
            }},{new:true}
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
            }},{new:true}
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
        let data = []
        User.find({
            username:{$regex: `${req.query.username}` }
        }).exec((err,result1)=>{
            if (err) throw err
            data.push(result1)
        })
        User.find({
            profile:{fullname:{$regex: `${req.query.username}`}}
        }).exec((err,result2)=>{
            if (err) throw err
            data.push(result2)
            return res.json(data)
        })
    },
    getNotification:(req,res,next)=>{
        User.findOne({ username: req.params.username })
            .exec((err,result)=>{
                if (err) throw err
                return res.json(result.notification)
            })
    },
    
    resetPassword: (req,res,next)=>{
        
    }
}
export default UserController