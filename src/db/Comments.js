import mongoose from 'mongoose'

const CommentModel = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    to_id: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
})

const Comment = mongoose.model('Comments',CommentModel)
export default Comment