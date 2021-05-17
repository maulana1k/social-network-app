import mongoose from 'mongoose'

const FollowsModel = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    to_user_id: {
        type: String,
        required: true
    }
})

const Follows = mongoose.model('Follows',FollowsModel)
export default Follows