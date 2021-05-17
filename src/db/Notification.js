import mongoose from 'mongoose'

const NotificationModel = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    notif_message: {
        type: String,
        required: true
    }
})

const Notification = mongoose.model('Notification', NotificationModel)
export default Notification