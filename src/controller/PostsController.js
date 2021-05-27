import Posts from '../db/PostsModel.js'
import User from '../db/UserModel.js'
 
const PostsController = {
    getPagination: (req,res,next)=>{
        let page = req.query.page
        let limit = req.query.limit
        let from = page*limit
        let load = (page+1)*limit - 1
        Posts.find()
            .sort({timestmaps: -1})
            .slice(from,load)
            .toArray((err,result)=>{
                if (err) throw err
                return res.json(result)
            })
        
    },
    getByUser: (req,res,next)=>{
        Posts.find({
            username : req.params.username
        }).exec((err,result)=>{
            if (err) throw err
            if (!result) return res.status(404).send('empty post')
            return res.json(result)
        })
       
    },
    getDetail: (req,res,next)=>{
        Posts.findById(req.params.postId)
            .exec((err,result)=>{
            if (err) throw err
            if (!result) return resjson({msg:'post not found'})
            return res.json(result)
        })
        
    },
    post: (req,res,next)=>{
        // if(!req.file){
        //     return res.json({msg:'image not found'})
        // }  
        let images = req.file ? req.file.path : ''
        console.log(images)
        let {username,caption,tag} = req.body
        let post = new Posts({
            username,
            images ,
            caption,tag 
        })     
        post.save((err,result)=>{
            if (err) throw err 
            console.log(result)
            return res.json(result)
        }) 
        
    },
    edit: (req,res,next)=>{
        let {caption,tag} = req.body
        Posts.findByIdAndUpdate(
            req.params.postId,
            {$set:{ caption,
                tag:[tag]  }},
            {new:true}
            ).exec((err,result)=>{
                if (err) throw err
                return res.json(result)
            })
    },
    delete: (req,res,next)=>{
        Posts.deleteOne({
            _id : req.params.postId
        }).exec((err,result)=>{
            if(err) throw err
            return res.json({msg:'delete success'})
        })
        
    },
    likes:(req,res,next)=>{
        let {postId,username} = req.params
        Posts.findByIdAndUpdate(
            postId,
            {$push:{likes:{username}
            }},
            {new:true}
            ).exec((err,result)=>{
                if (err) console.log(err);
                let notif_message =  'just likes to your post'
                User.findOneAndUpdate(
                    {username:result.username},
                    {$push:{notification:{
                        subject:username,
                        purpose:postId,
                        notif_type:'likes',
                        notif_message:notif_message
                        }
                    }},{new:true})
                return res.json(result) 
            })
    },
    unlike:(req,res,next)=>{
        let {postId,username} = req.params
        Posts.findByIdAndUpdate(postId,
            {$pull:{
                likes: {username:username}
            }},
            {new:true}
            ).exec((err,result)=>{
                 if (err) console.log(err)
                 res.json(result)

                 return 
             })
            
    }
}

export default PostsController