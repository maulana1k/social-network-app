import mongoose from 'mongoose'
const Schema = mongoose.Schema

const CommentsModel = new Schema({
	username:String,
	fullname:String,
	avatar:String,
	comment:String,
	replies:[{ type:Schema.Types.ObjectId, ref:'Comment'}]
	timestamps:{ type:Date, default: Date.now }	
})

const Comments = mongoose.model('Comments',CommentsModel)

export default Comments