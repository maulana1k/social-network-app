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
    verified: {
        type: Boolean,
        required: false
    }
})
const User = mongoose.model('User',UserModel)
export default User