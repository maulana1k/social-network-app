import react,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../utilities/UserContext.js'

import axios from 'axios'
import {Timeline,Button} from 'antd'
import {Link} from 'react-router-dom'

export default function Notification(){
	const [user] = useContext(UserContext)
	const [notif,setNotif] = useState(null)
	const url = 'http://localhost:8080'
	console.log('notif',notif)
	useEffect(()=>{
		axios.get(`${url}/${user.username}/notification`)
		.then(res=>{
			let data = res.data.reverse()
			setNotif(data)
		}).catch(err=>{ console.log(err.response) })
	},[])
    return (<>
    	<div className="container h-14 flex items-center bg-white border-b px-4  ">
            <div className="text-gray-700 text-xl"><b>Notifications</b></div>
        </div>
        <div className="container px-4 py-6 space-y-2 flex flex-col">
	       <Timeline>
	       { notif ? notif.map((el,index)=>{
	       	return(
		       	<Timeline.Item key={index} >
		       		<div className="container p-4 bg-white rounded-md ">
		       		<Link to={`/${el.subject}`} ><b>{el.subject}</b></Link> {el.notif_message}
		       		{(el.notif_type=='comment'||el.notif_type=='likes'||el.notif_type=='tag') 
		       		&& <div className="w-2/3 mx-auto pt-2" >
			       		<Button  size="small" block  >
			       		<Link to={`/post/${el.refer}`}>view</Link>
			       		</Button></div> }
		       		</div>
	       		</Timeline.Item>
	       		)
	       }) : <div className="text-gray-500 text-lg flex justify-center">No Notifications</div> }
	       </Timeline>
        </div>
        </>
    )
}
