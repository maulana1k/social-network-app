import Posts from '../db/PostsModel.js'
import User from '../db/UserModel.js'

const CommentController = {
    post: (req,res,next)=>{
        let {comment,fullname,avatar} = req.body
        let {postId,username} = req.params
    
        Posts.findByIdAndUpdate(postId,
            {$push:{
                comments:{username,fullname,comment,avatar}
            }},
            {new:true}
            ).populate('author').exec((err,result)=>{
                if (err) throw err
                console.log('comment',result.comments)
                let notif_message = `just comments to your post "${comment}"`
                console.log(username+' '+notif_message)
                User.findOneAndUpdate(
                    {username: result.username},
                    {$push:{notification:{
                            subject:username,
                            refer:postId,
                            notif_type: 'comment',
                            notif_message: notif_message}
                        }},{new:true}).exec((err,data)=>{console.log('notif added!')})  
                return res.json(result)
        })
            
    },
    test:(req,res,next)=>{
        let {postId,username} = req.params
        User.findOne({
                    notification:{$elemMatch:{
                        subject:username,refer:postId,notif_type:'comment'
                    }}
                })
                    .exec((err,notif)=>{
                    let woi = notif 
                    console.log('notif',woi)
                    return res.send(notif)
                })
    },
    replies_comment:(req,res,next)=>{
        let {comment,fullname,avatar} = req.body
        let {commentId,username,postId} = req.params
        console.log('commentId',commentId)
        Posts.findOneAndUpdate(
            {_id:postId},
            {$push:{"comments.$[elem].replies":{comment,fullname,username,avatar}}},
            {multi:false,arrayFilters:[{"elem._id":commentId}],new:true}
            
            ).populate('author').exec((err,result)=>{
                if (err) return res.status(500).send(err)
                console.log('replies',result.comments.replies)
                return res.json(result)
        })
    },
    delete_rep_comment:(req,res,next)=>{
        let {repId,commentId,postId} = req.params
        console.log('repId',repId)
        Posts.findOneAndUpdate(
            {_id:postId},
            {$pull:{"comments.$[elem].replies":{_id:repId}}},
            {multi:false,arrayFilters:[{"elem._id":commentId}],new:true}
            
            ).populate('author').exec((err,result)=>{
                if (err) return res.status(500).send(err)
                console.log('replies deleted')
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
            ).populate('author').exec((err,result)=>{
                if (err) throw err
                return res.json(result)
            })
    }
}

export default CommentController