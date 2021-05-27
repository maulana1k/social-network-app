
import {Avatar,Input,Mentions,Button,Upload} from 'antd'
import ImgCrop from 'antd-img-crop'

export default function Uploads(){

	const {Option} = Mentions
	const {TextArea} = Input	
	return(
		<div className="container bg-white flex flex-wrap p-5 space-y-4">
			<div className="container items-center flex space-x-3">
				<Avatar size="large" />
				<div className="text-gray-700">Whats on your mind?</div>
			</div>
			<TextArea bordered={false} style={{width:'100%'}} placeholder="Text here..." showCount maxLength={150} autoSize={{minRows:4,maxRows:8}}  />
			<ImgCrop>
				
				<Upload
					action=""
					className="avatar-uploader"
					listType="picture-card"
					showUploadList={false}
					maxCount={1}
				>
				<div className="w-1/2" >Add photo</div>
				</Upload>
			
			</ImgCrop>
			
			<div className="text-gray-700">Mentions</div>
		
			<Mentions
			style={{borderRadius:'6px'}}
			placeholder="@yourfriend"
			>
				<Option></Option>
			</Mentions>
		
			
			<Button type="primary" style={{borderRadius:'6px'}} block>Post</Button>
			
		</div>
		)
}