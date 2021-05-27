import mongoose from 'mongoose'

const UserModel = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        dropDups: true,
    },
    password: {
        type: String,
        required: true
    },
    verified: Boolean,
    profile: {
        avatar:{ type:String, default: ''},
        fullname: { type:String, default: ''},
        bio: { type:String, default: ''},
        phone: { type:Number, default: ''}
     },
    follower: [{ username: String }],
    following: [{ username: String}],
    notification:[ {
        subject:  String,
        purpose:  String,
        notif_type: String,
        notif_message: String, 
        timestamps:{ type:Date, default: Date.now }
    }]
})
const User = mongoose.model('User',UserModel)
export default User