import User  from '../db/UserModel.js'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
const SECRET_KEY = 'socialnetappwysiwyg'

const UserController = {

     register: (req,res,next)=> {
        let {fullname,username,email,password} = req.body
        let user = new User({
            profile:{fullname},
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
            let {_id,username,profile,posts,follower,following,notification} = user
            return res.json({_id,username,profile,posts,follower,following,notification,token})
        })
    },

    login: (req,res,next)=>{
        User.findOne({
            username: req.body.username
        }).exec((err,user)=>{
            if (err) return res.status(500).send(err)
            if (!user) { return res.status(400).send('Username not found!')}
            let passwordValid = bcryptjs.compareSync(req.body.password,user.password)
            console.log(passwordValid);
            if (!passwordValid) {
                return res.status(400).send('Wrong password!')
            }
            let token = jwt.sign({id:user._id},SECRET_KEY)
            let {_id,username,profile,posts,follower,following,notification} = user
            return res.json({_id,username,profile,posts,follower,following,notification,token})
        })
    },
    updateProfile: (req,res,next)=>{
        let avatar = req.file? req.file.path : req.body.avatar
        let {fullname,bio,phone,websites} = req.body
        console.log('phone',phone)
        User.findOneAndUpdate(
            {username: req.params.username},
            {$set:{
                profile:{fullname,avatar,bio,phone,websites}
            }},
            {new:true})
            .exec((err,result)=>{
                if (err) return res.status(500).send(err)
                return res.json(result)
            })
        
    },
    getProfile:(req,res,next)=>{
        User.findOne({username : req.params.username})
            .exec((err,result)=>{
                if (err) return res.status(500).send(err)
                if (!result) return res.status(404).send('user not found!')
                let {profile,username,follower,following} = result
                return res.json({profile,username,follower,following})
            })
    },
    follow:(req,res,next)=>{
        let {username,toUsername} = req.params
        let {fullname,avatar} = req.body
        //follower on target user
        User.findOneAndUpdate(
            {username:toUsername},
            {$push:{
                follower:{username:username,fullname,avatar}
            }},{new:true}
            ).exec((err,result)=>{
                if (err) return res.status(500)
                //following on subject user
                User.findOneAndUpdate(
                    {username:username},
                    {$push:{
                        following:{
                            username:toUsername,
                            fullname:result.profile.fullname,
                            avatar:result.profile.avatar}
                    }},{new:true}
                    ).exec((err,result)=>{
                        if (err) return res.status(500)
                        
                        //notif
                        let notif_message =  'started to following you'
                        User.findOne(
                            {username:toUsername,
                            notification:{subject:username,refer:toUsername,notif_type:'follow'}})
                            .exec((err,data)=>{
                            let alreadyNotif = data 
                            console.log('notif',alreadyNotif)
                            if(alreadyNotif==null)
                            User.findOneAndUpdate(
                                {username: toUsername},
                                {$push:{notification:{
                                        subject:username,
                                        refer:toUsername,
                                        notif_type:'follow',
                                        notif_message : notif_message}
                                }},{new:true}
                                ).exec((err,result)=>{
                                    if (err) throw err
                                })
                        })
                        
                    })
            let {profile,follower,following} = result
            let usrname = result.username
            return res.json({profile,username:usrname,follower,following})
            })
    },
    unfollow:(req,res,next)=>{
        let {username,toUsername} = req.params
       
        User.findOneAndUpdate(
            {username:username},
            {$pull:{
                following: {username:toUsername}
            }},{new:true}
            ).exec((err,result)=>{
                if (err) return res.status(500)
            })
            
        User.findOneAndUpdate(
            {username:toUsername},
            {$pull:{
                follower:{username:username}
            }},{new:true}
            ).exec((err,result)=>{
                if (err) throw err
                let {profile,username,follower,following} = result
                return res.json({profile,username,follower,following})
            })
        
        
    },
    searchQuery:(req,res,next)=>{
        User.find({
            username:{$regex: `${req.query.username}` }
        }).exec((err,result)=>{
            if (err) return res.status(500).send(err)
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
    suggestion:(req,res,next)=>{
        User.find().exec((err,result)=>{
            if(err) return res.status(500).send(err)
            // return res.send(result)
            let resFil = result.filter(el=>{
                return( el.profile.fullname.length>0 &&
                        el.profile.avatar.length>0 &&
                        el.profile.phone.length>0 && 
                        el.profile.websites.length>0 &&
                        el.profile.bio.length>0)
            })
            resFil.slice(0,8)
            return res.send(resFil)
        })
    },
    resetPassword: (req,res,next)=>{
        
    }
}
export default UserController