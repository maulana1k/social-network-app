import Posts from '../db/PostsModel.js'

const CommentController = {
    post: (req,res,next)=>{
        let {comment,tag} = req.body
        let {postId,username} = req.params
        Posts.findByIdAndUpdate(postId,
            {$push:{
                comments:{
                    username,
                    comment,
                    tag:{username:tag}
                }
            }},
            {new:true}
            ).exec((err,result)=>{
                if (err) throw err
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