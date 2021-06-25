import react,{useState,useEffect,useContext} from 'react'
import {UserContext,Content} from '../utilities/Context.js'

import moment from 'moment'

import axios from 'axios'
import {Timeline,Button} from 'antd'
import {Loading3QuartersOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'

export default function Notification(){
	const [user] = useContext(UserContext)
	const {notifState} = useContext(Content)
	const [notif,setNotif] = notifState

	const url = 'https://api-socialite.herokuapp.com'
	console.log('notif',notif)

	useEffect(()=>{
		axios.get(`${url}/${user.username}/notification`)
		.then(res=>{
			let data = res.data.reverse()
			if (data.length>0) setNotif(data)
		}).catch(err=>{ console.log(err.response) })
	},[])
    return (<>
    	<div style={{background:'#1976D2'}} className="w-full h-14 flex md:hidden items-center border-b px-4  bg-white">
            <div style={{color:'white'}} className=" text-xl"><b>Notifications</b></div>
        </div>
        <div className="w-full px-4  flex flex-col">
	        <div className="flex text-lg my-4 text-gray-700">{notif && <b>{notif.length} activities</b> }</div>
	       <Timeline>
	       { notif  && notif.map((el,index)=>{
	       	return(
		       	<Timeline.Item key={index} >
		       		<div className="w-full p-2 flex justify-between items-center md:border bg-white rounded-md ">
		       		<div>
		       		<Link to={`/${el.subject}`} ><b>{el.subject}</b></Link> {el.notif_message}
		       		<div className="text-gray-500 text-xs">{moment(el.timestamps).fromNow()}</div>
		       		</div>
		       		{(el.notif_type=='comment'||el.notif_type=='likes'||el.notif_type=='tag') 
		       		&& <div >
			       		<Link to={`/post/${el.refer}`}>
			       		<Button type="primary">view</Button>
			       		</Link>
			       		</div> }
		       		</div>
	       		</Timeline.Item>
	       		)
	       }) }
	       </Timeline>
	       {!notif && <div className="text-gray-500 text-lg flex my-auto justify-center"><Loading3QuartersOutlined style={{fontSize:'40px',color:'gray'}} spin /></div> }
	       {notif && notif.length===0 && <div className="text-gray-500 text-lg flex justify-center">No notification</div>}
        </div>
        </>
    )
}
