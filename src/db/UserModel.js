import mongoose from 'mongoose'

const Schema = mongoose.Schema;

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
        avatar:{ type:String, default: 'public/avatars/default-avatar.jpg'},
        fullname: { type:String, default: ''},
        bio: { type:String, default: ''},
        phone: { type:String, default: ''},
        websites:{ type:String, default: ''}
     },
    follower: [{ username:{type:String,unique:true,dropDups:true},
                fullname:String,
                avatar:String}],
    following: [{ username:{type:String,unique:true,dropDups:true},
                fullname:String,
                avatar:String}],
    notification:[ {
        subject:  String,
        refer:  String,
        notif_type: String,
        notif_message: String, 
        timestamps:{ type:Date, default: Date.now }
    }],
    posts: [{ type:Schema.Types.ObjectId, ref:'Posts' }]
})
const User = mongoose.model('User',UserModel)
export default User