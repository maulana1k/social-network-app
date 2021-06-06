
import {Timeline} from 'antd'
import {Link} from 'react-router-dom'

export default function Notification(){
	
    return (<>
    	<div className="container h-14 flex items-center bg-white px-4  ">
            <div className="text-gray-700 text-xl"><b>Notifications</b></div>
        </div>
        <div className="container px-4 py-2 space-y-2 bg-white flex flex-col">
	       <Timeline>
	       	<Timeline.Item  >
	       		<div className="container p-2 rounded-md shadow-md">
	       		<Link to="/profile" ><b>felicia.angelique_</b></Link>  started to following you
	       		</div>
       		</Timeline.Item>
	       	<Timeline.Item  >
	       		<div className="container p-2 rounded-md shadow-md">
	       		miskah started to following you
	       		</div>
       		</Timeline.Item>
	       	<Timeline.Item  >
	       		<div className="container p-2 rounded-md shadow-md">
	       		Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias molestiae inventore ratione sunt, consectetur tempore placeat ipsum assumenda iste numquam rem esse, aliquam temporibus praesentium asperiores cum quibusdam! Ipsum, error?
	       		</div>
       		</Timeline.Item>
	       </Timeline>
        </div>
        </>
    )
}
