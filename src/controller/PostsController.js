import Posts from '../db/Posts.js'

const PostsController = {

    getByUser: (req,res,next)=>{
        Posts.find({
            user_id : req.params.userId
        }).exec((err,data)=>{
            if (err) return res.status(500).send(err)
            if (!data) return res.status(404).send({msg:'post not found'})
            res.status(200).send(data)
        })
        next()
    },
    getDetail: (req,res,next)=>{
        Posts.findOne({
            _id : req.params.postId
        }).exec((err,data)=>{
            if (err) return res.status(500).send(err)
            if (!data) return res.status(404).send({msg:'post not found'})
            res.status(200).send(data)
        })
        next()
    },
    post: (req,res,next)=>{
        if(!req.file){
            return res.send(401).send({msg:'image not found'})
        }  
        let images = req.file.path
        let {user_id,caption,tag} = req.body
        let post = new Posts({
            user_id,images,caption,tag 
        })     
        post.save((err,result)=>{
            if (err) return res.status(500).send(err)
            res.status(200).send('success')
        }) 
        next()
    },
    edit: (req,res,next)=>{
        let {caption,tag} = req.body
        Posts.findOneAndUpdate(
            { _id : req.params.postId },
            {$set:{ caption,tag  }},
            {new:true},
            (err,result)=>{
                if (err) return res.status(500).send(err)
                res.status(200).send(result)
            }
        )
        next()
    },
    delete: (req,res,next)=>{
        Posts.deleteOne({
            _id : req.params.postId
        }).exec((err,result)=>{
            if(err)return res.status(500).send(err)
            res.status(200)
        })
        next()
    }
}

export default PostsController