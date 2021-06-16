import react,{useState,useContext} from 'react'
import axios from 'axios'
import {UserContext} from '../utilities/UserContext.js'
import {useHistory,useLocation} from 'react-router-dom'

import {Avatar,Upload,Button,Input,Form,notification} from 'antd'
import ImgCrop from 'antd-img-crop'
import {CloseOutlined,CheckOutlined,DeleteOutlined,UploadOutlined} from '@ant-design/icons'

const {TextArea} = Input

export default function UpdateProfile() {
	const location = useLocation()
	const {userProfile} = location
	console.log(userProfile)
	const [user,token] = useContext(UserContext)
	const [imgFile,setImgFile] = useState(null)
	const [currentAvatar,setCurrentAvatar] = useState(userProfile.avatar)
	const [fullname,setFullname] = useState(userProfile.fullname)
	const [bio,setBio] = useState(userProfile.bio)
	const [phone,setPhone] = useState(userProfile.phone)
	const [websites,setWebsites] = useState(userProfile.websites)
	const [loading,setLoading] = useState(false)

	const url = 'https://api-socialite.herokuapp.com'
	const [imgPrev,setImgPrev] = useState(`${url}/${userProfile.avatar}`)
	console.log('prev',imgPrev,'av',imgFile,bio,phone,fullname)
	const history = useHistory()

	const handleSubmit = async () => {
		setLoading(true)
		let avatar = imgFile ? imgFile : currentAvatar		
		const data = new FormData()
		data.append('fullname',fullname)
		data.append('bio',bio)
		data.append('phone',phone)
		data.append('avatar',avatar)
		data.append('websites',websites)
		console.log('data',data)
		try{
			await axios.put(`${url}/${user.username}/profile`,data
				,{headers:{'content-type':'multipart/form-data','authorization':token}}
			).then(res=>{
				notification['success']({
					message:'Profile updated! '
				})
				console.log(res.data)
				history.push('/'+user.username)
			})
		}catch(err){ 
			setLoading(false) 
			console.log(err.response) }
	}
	const changePrev = file =>{
		let imgURL = URL.createObjectURL(file)
		setImgPrev(imgURL)
		setImgFile(file)
		return false
	}
	
	return(
		<div className="container flex flex-col bg-white justify-center text-gray-700 space-y-6 p-12">	
				<Avatar size={112} src={imgPrev} />
				
				<div className="flex space-x-4 " >
				<ImgCrop>
					<Upload 
					maxCount={1} 
					beforeUpload={changePrev}
					>
						<Button style={{alignItems:'center',display:'flex'}} ><UploadOutlined/></Button>
					</Upload>
				</ImgCrop>
				<Button onClick={()=>{setImgPrev('');setCurrentAvatar('')}} danger style={{alignItems:'center',display:'flex'}} ><DeleteOutlined/></Button>
				</div>
		
			
				<div className="container space-y-4 ">
					<div>
					<b>Fullname</b>
					<Input value={fullname} onChange={e=>setFullname(e.target.value)} />
					</div>
				
					<div>
					<b>Bio</b>
					<TextArea style={{width:'100%',borderRadius:'10px'}} 
					showCount 
					maxLength={100} 
					autoSize={{minRows:3,maxRows:8}}
					value={bio}
					onChange={e=>setBio(e.target.value)}  />
					</div>				
				
					<div>
						<b>Phone</b>
						<Input type="number" value={phone} onChange={e=>{setPhone(e.target.value)}} />
					</div>
					<div>
						<b>Websites</b>
						<Input value={websites} onChange={e=>setWebsites(e.target.value)} />
					</div>
					
					
					<div className="space-x-4 container flex justify-end">
						<Button style={{alignItems:'center',display:'flex'}} 
						onClick={()=>window.history.back()}
						danger
						icon={<CloseOutlined />} >Cancel</Button>
						<Button style={{alignItems:'center',display:'flex'}} 
						type="primary" 
						htmlType="submit" 
						loading={loading}
						onClick={handleSubmit}
						icon={<CheckOutlined/>}>Save</Button>
					</div>	
					
				</div>
			
		</div>
		)
}