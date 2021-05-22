import mongoose from 'mongoose'

const PostsModel = new mongoose.Schema({
    username: { type: String, required: true },
    caption: {type: String, default: '' },
    images: { type: String, default: ''},
    tag: [{
        username: String
    }],
    comments: [{
        username: {type:String, default: ''},
        comment: {type:String, default: ''},
        tag: [{username: String }]
    }],
    likes: [{
        username: String
    }],
    timestamps:{ type:Date, default: Date.now }
})

const Posts = mongoose.model('Posts', PostsModel)
export default Posts