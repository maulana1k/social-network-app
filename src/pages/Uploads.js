import React,{useState,useContext} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

import {UserContext} from '../utilities/UserContext.js'
import {Avatar,Input,Mentions,Button,Upload,Form,notification,Image} from 'antd'
import ImgCrop from 'antd-img-crop'
import {CloseOutlined,CheckOutlined} from '@ant-design/icons'
const {Option} = Mentions
const {TextArea} = Input

export default function Uploads(){
	const [user,setUser,token] = useContext(UserContext)
	const [tags, setTags] = useState([])
	const [images,setImages] = useState('')
	const [imgPrev,setImgPrev] = useState('')
	const [loading,setLoading] = useState(false)

	console.log('tags\n',tags,'file\n',images)
	const history = useHistory()
	const url = 'https://api-socialite.herokuapp.com'
	console.log('token',token)
	const handleUpload= async (values)=>{
		setLoading(true)
		let {caption,tag} = values
		console.log('tag',tag)
		let tagsUser = tag ? tag.replace(/\s/ig,"").split('@') : []
		tagsUser.shift()
		console.log('tagsUser\n',tagsUser)
		const data = new FormData();
		data.append('author',user._id);
		data.append('username',user.username)
		data.append('images',images);
		tagsUser.forEach(item=> data.append('tag[]',item) ) 
		data.append('caption',caption?caption:'');
		console.log('data\n',data);
		
			axios.post(`${url}/post/${user.username}`,data
				,{headers:{'content-type':'multipart/form-data','authorization':token.token}}
			).then( res => {
				history.push(`/${user.username}`)
				notification['success']({
					message:'Post success! ',
					description:'Let see what your friend reacts.'
				})
				console.log(res.data)
			}).catch(err=>{
			setLoading(false)
			console.log(err.response)})
		
	}	
	
	const tagSearch = params => {
		axios.get(`${url}/search?username=${params}`)
		.then( res =>{
			let data = res.data.filter(el=>{return el.username!==user.username})
			setTags(data)
		} ).catch(err=>{ console.log(err) })
	}
	
	const getImage = file =>{
	  	let imgURL = URL.createObjectURL(file)
	  	setImgPrev(imgURL)
	  	setImages(file)
	  	return false
	}
	return (<>
		<div className="container h-14 flex border-b items-center bg-white px-4 ">
            <div className="text-gray-700 text-xl"><b>Uploads</b></div>
        </div>
		<div className="container  flex flex-col p-5 pb-12 space-y-4">
			<div className="container items-center flex space-x-3">
				<Avatar size="large" src={`https://api-socialite.herokuapp.com/${user.profile.avatar}`} />
				
				<div className="text-gray-700">Whats on your mind?</div>
			</div>
		<Form name="uploads" onFinish={handleUpload} encType="multipart/form-data" >
			<Form.Item name="caption" >
				<TextArea autoFocus placeholder="Text here..." showCount maxLength={200} autoSize={{minRows:4,maxRows:8}}  />
			</Form.Item>
			<Form.Item name="images" >
				{ imgPrev && ( 
					<Image src={imgPrev} style={{borderRadius:'5px'}}  /> 
				)
				}
			{/*if carousel*/}
			{/*<div className="flex flex-grow space-x-3 overflow-x-scroll">
				{ imgPrev && imgPrev.map((img,index)=>{
					return (
					<div className="shadow-lg flex-shrink-0 max-w-full my-4 overflow-hidden">
					<Image src={img} key={index} /> 
					</div>)
					}) 
			</div>
				}*/}
			<ImgCrop>
				<Upload
				beforeUpload={getImage}
				maxCount={1}>
				{ !imgPrev ? <Button type="primary" > Add photo </Button>:<Button type="primary" > Change photo </Button>}
				</Upload>
			</ImgCrop>
			</Form.Item>
			<div className="text-gray-700">Mentions</div>
			<Form.Item name="tag" >
				<Mentions
			
				placeholder="@yourfriend"
				onSearch={tagSearch} >
				{ tags && tags.map((item,index)=>{
					return <Option key={index} value={item.username} >{item.username}</Option>
				})
				}

				</Mentions>
			</Form.Item>
			<Form.Item>
				<div className="space-x-4 container flex justify-end">
					<Button style={{alignItems:'center',display:'flex'}} 
					onClick={()=>window.history.back()}
					icon={<CloseOutlined style={{color:'orangered'}} />} >Cancel</Button>
					<Button style={{alignItems:'center',display:'flex'}} 
					type="primary" 
					htmlType="submit" 
					loading={loading}
					disabled={images?false:true}
					icon={<CheckOutlined/>}>Post</Button>
				</div>	
			</Form.Item>
		</Form>
		</div>
		</>
		)
}