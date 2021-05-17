import User  from '../db/User.js'
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
        })
    },

    resetPassword: (req,res,next)=>{
        
    }
}
export default UserController