import react,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../utilities/UserContext.js'
import moment from 'moment'

import axios from 'axios'
import {Timeline,Button} from 'antd'
import {Link} from 'react-router-dom'

export default function Notification(){
	const [user] = useContext(UserContext)
	const [notif,setNotif] = useState(null)
	const url = 'https://api-socialite.herokuapp.com'
	console.log('notif',notif)
	useEffect(()=>{
		axios.get(`${url}/${user.username}/notification`)
		.then(res=>{
			let data = res.data.reverse()
			setNotif(data)
		}).catch(err=>{ console.log(err.response) })
	},[])
    return (<>
    	<div className="w-full h-14 flex items-center bg-white border-b px-4  ">
            <div className="text-gray-700 text-xl"><b>Notifications</b></div>
        </div>
        <div className="w-full px-4 py-6  flex flex-col">
	       <Timeline>
	       { notif ? notif.map((el,index)=>{
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
			       		<Button  size="small" type="primary">view</Button>
			       		</Link>
			       		</div> }
		       		</div>
	       		</Timeline.Item>
	       		)
	       }) : <div className="text-gray-500 text-lg flex justify-center">No Notifications</div> }
	       </Timeline>
        </div>
        </>
    )
}
