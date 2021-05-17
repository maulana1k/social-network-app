import mongoose from 'mongoose'

const PostsModel = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: false
    },
    images: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: false
    }
})

const Posts = mongoose.model('Posts', PostsModel)
export default Posts