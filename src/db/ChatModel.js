import mongoose from 'mongoose'
const Schema =mongoose.Schema

const ChatSchema = new Schema({
	user:{type:Schema.Types.ObjectId,required:true,ref:'User'},
	with:{type:Schema.Types.ObjectId,required:true,ref:'User'},
	thread:[{
		sender:String,
		message:String,
		message_type:String,
		isRead:Boolean,
		message_file:String,
		timestamps:{type:Date,default: Date.now}
	}],
	timestamps:{type:Date,default: Date.now}
	
})

const Chat = mongoose.model('Chat',ChatSchema)
export default Chat