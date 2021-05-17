import Profile from '../db/Profile.js'

const ProfileController = {

     get : (req,res,next)=> {
            Profile.findOne({
            user_id : req.params.userId
        }).exec((err,result)=>{
            if (err) return 
            if (!result) return res.send({msg:'profile not filled yet'})
            res.status(200).send(result)
            return
        })
        
    },

     post : (req,res,next)=> {
        let avatar = req.file ? req.file.path : ''
        let user_id = req.params.userId
        let {fullname,bio,phone } = req.body
        let userProfile = new Profile({
            user_id,
            avatar,
            fullname,
            bio,
            phone
        })
        userProfile.save((err,result)=>{
            if (err) return
            res.status(200).send(result)
            return
        })
        
    },

     edit : (req,res,next)=>{
        let avatar = req.file? req.file.path : ''
        let {fullname,bio,phone} = req.body
        Profile.findOneAndUpdate(
            {user_id: req.params.userId},
            {$set:{fullname,avatar,bio,phone}},
            {new:true},
            (err,result)=>{
                if (err) return
                res.status(200).send(result)
                return
            }
        )
       
    }

}

export default ProfileController