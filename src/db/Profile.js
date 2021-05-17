import mongoose from 'mongoose'

const ProfileModel = new mongoose.Schema({
    user_id : {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
    fullname: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false
    },
    phone: {
        type: Number,
        required: false
    }
})

const Profile = mongoose.model('Profile',ProfileModel)
export default Profile