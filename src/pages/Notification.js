
import {Timeline} from 'antd'
import {Link} from 'react-router-dom'

export default function Notification(){
	
    return (
        <div className="container px-4 py-8 divide-y-2 space-y-2 bg-white flex flex-col">
	       <Timeline>
	       	<Timeline.Item  ><Link to="/profile" ><b>felicia.angelique_</b></Link>  started to following you</Timeline.Item>
	       	<Timeline.Item  >miskah started to following you</Timeline.Item>
	       	<Timeline.Item  >Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias molestiae inventore ratione sunt, consectetur tempore placeat ipsum assumenda iste numquam rem esse, aliquam temporibus praesentium asperiores cum quibusdam! Ipsum, error?</Timeline.Item>
	       	<Timeline.Item  >Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum iste, voluptatibus incidunt dolor illum obcaecati quod praesentium nesciunt quam esse in suscipit tenetur vero necessitatibus error, eaque tempore illo nobis.</Timeline.Item>
	       </Timeline>
        </div>
    )
}
