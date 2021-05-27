import Posts from '../db/PostsModel.js'
import User from '../db/UserModel.js'

const CommentController = {
    post: (req,res,next)=>{
        let {comment,tag,avatar} = req.body
        let {postId,username} = req.params
        Posts.findByIdAndUpdate(postId,
            {$push:{
                comments:{username,comment,avatar,tag:{username:tag}}
            }},
            {new:true}
            ).exec((err,result)=>{
                if (err) throw err
                let notif_message = 'just comments to your post'
                User.findOneAndUpdate(
                    {username: result.username},
                    {$push:{notification:{
                            subject:username,
                            purpose:postId,
                            notif_type: 'comment',
                            notif_message: notif_message}
                        }},{new:true})  
                return res.json(result)
            })
    },
    delete: (req,res,next)=>{
        let {postId,commentId} = req.params
        Posts.findByIdAndUpdate(postId,
            {$pull:{
                comments:{
                    _id:commentId
                }
            }},
            {new:true}
            ).exec((err,result)=>{
                if (err) throw err
                return res.json(result)
            })
    }
}

export default CommentController