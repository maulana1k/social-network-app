import mongoose from 'mongoose'

const LikesModel = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    post_id: {
        type: String,
        require: true
    }
})

const Likes = mongoose.model('Likes',LikesModel)
export default Likes