import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const PostsModel = new mongoose.Schema({
    author:{ type:Schema.Types.ObjectId, ref:'User',required:true },
    username:{type:String, default:''},
    caption: {type: String, default: '' },
    images: { type: String, default: ''},
    tag: Array,
    comments: [{
        username: String,
        comment: String,
        fullname:String,
        avatar:String,
        replies:[{
            username: String,
            comment: String,
            avatar:String
        }]
    }],
    likes: [{username:{type:String,dropDups:true},fullname:String,avatar:String}] ,
    timestamps:{ type:Date, default: Date.now }
})

const Posts = mongoose.model('Posts', PostsModel)
export default Posts