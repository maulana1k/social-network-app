import react,{useState} from 'react'
import axios from 'axios'
import {Avatar,Upload,Button,Input,Form} from 'antd'
import ImgCrop from 'antd-img-crop'
import {CloseOutlined,CheckOutlined} from '@ant-design/icons'

const {TextArea} = Input
export default function UpdateProfile({userProfile}) {
	const [imgFile,setImgFile] = useState(null)
	const [fullname,setFullname] = useState(userProfile.fullname)
	const [bio,setBio] = useState(userProfile.bio)
	const [phone,setPhone] = useState(userProfile.phone)
	const [imgPrev,setImgPrev] = useState(userProfile.avatar)
	console.log('prev',imgPrev,'av',imgFile)

	const handleSubmit = () => {
		console.log('val',fullname,bio,phone)
		const data = new FormData()
		data.append('fullname',fullname)
		data.append('bio',bio)
		data.append('phone',phone)
		data.append('avatar',imgFile)
		console.log('data',data)

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
			<ImgCrop>
				<Upload 
				maxCount={1} 
				beforeUpload={changePrev}
				>
					<Button>Change Avatar</Button>
				</Upload>
			</ImgCrop>
		
			
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
				
					
					<div className="space-x-4 container flex justify-end">
						<Button style={{alignItems:'center',display:'flex'}} 
						onClick={()=>window.history.back()}
						icon={<CloseOutlined style={{color:'orangered'}} />} >Cancel</Button>
						<Button style={{alignItems:'center',display:'flex'}} 
						type="primary" 
						htmlType="submit" 
						onClick={handleSubmit}
						icon={<CheckOutlined/>}>Save</Button>
					</div>	
					
				</div>
			
		</div>
		)
}