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
	const [user,setUser] = useContext(UserContext)
	const [tags, setTags] = useState([])
	const [images,setImages] = useState('')
	const [imgPrev,setImgPrev] = useState('')
	console.log('tags\n',tags,'file\n',images)
	const history = useHistory()
	const url = 'http://localhost:8080'
	const handleUpload= async (values)=>{
		let {caption,tag} = values
		let tagsUser = tags.length>0 ? tags.split('@').slice(1) : []
		console.log('tags\n',tags)
		const data = new FormData();
		data.append('author',user._id);
		data.append('username',user.username)
		data.append('images',images);
		data.append('tag',tagsUser) 
		data.append('caption',caption);
		console.log('data\n',data);
		try{
			await axios.post(`${url}/post/${user.username}`,data
				,{headers:{'content-type':'multipart/form-data',}}
			).then( res => {
				notification['success']({
					message:'Upload success! ',
					description:'Let see what your friend reacts.'
				})
				console.log(res.data)
				history.push('/p/'+user.username)
			})
		} catch (err) { console.log(err.response) }
	}	
	
	const tagSearch = params => {
		axios.get(`${url}/search?username=${params}`)
		.then( res =>{
			setTags(res.data)
		} ).catch(err=>{ console.log(err) })
	}
	// const onPreview = async file => {
	//     let src = file.url;
	//     if (!src) {
	//       src = await new Promise(resolve => {
	//         const reader = new FileReader();
	//         reader.readAsDataURL(file.originFileObj);
	//         reader.onload = () => resolve(reader.result);
	//       });
	//     }
	//     const image = new Image();
	//     image.src = src;
	//     const imgWindow = window.open(src);
	//     imgWindow.document.write(image.outerHTML);
	//   };
	const getImage = file =>{
	  	let imgURL = URL.createObjectURL(file)
	  	setImgPrev(imgURL)
	  	setImages(file)
	  	return false
	}
	return (<>
		<div className="container h-14 flex items-center bg-white px-4 ">
            <div className="text-gray-700 text-xl"><b>Uploads</b></div>
        </div>
		<div className="container bg-white flex flex-col p-5 pb-12 space-y-4">
			<div className="container items-center flex space-x-3">
				<Avatar size="large" />
				<div className="text-gray-700">Whats on your mind?</div>
			</div>
		<Form name="uploads" onFinish={handleUpload} encType="multipart/form-data" >
			<Form.Item name="caption" >
				<TextArea placeholder="Text here..." showCount maxLength={200} autoSize={{minRows:4,maxRows:8}}  />
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
			{/*<ImgCrop>
			</ImgCrop>*/}
				<Upload
				beforeUpload={getImage}
				
				maxCount={1}>
				{ !imgPrev ? <Button type="primary" > Add photo </Button>:<Button type="primary" > Change photo </Button>}
				</Upload>
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
					
					icon={<CheckOutlined/>}>Post</Button>
				</div>	
			</Form.Item>
		</Form>
		</div>
		</>
		)
}