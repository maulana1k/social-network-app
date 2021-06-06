import react , {useState,useContext} from 'react'
import {UserContext} from '../utilities/UserContext.js'

// import {Avatar,Input} from '@chakra-ui/react'
// import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
// import SendRounded from '@material-ui/icons/SendRounded'
import {Input,Avatar,Collapse,Comment,Typography,Image,Button} from 'antd'
import {HeartOutlined,SendOutlined,CommentOutlined,MoreOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'


export default function Card({item,author}){
    const [user,setUser] = useContext(UserContext)

    const [ellipsis,setEllipsis] = useState(true)


    const {Paragraph} = Typography 
	const {Panel} = Collapse
	return (
		 <div className="container flex flex-col space-y-3 text-gray-700 rounded-xl bg-white border-2 border-gray-200 p-2 ">
                <div className="container flex items-center space-x-4">
                        <Avatar size="small" src={author.profile.avatar} />
                        <Link to={`/p/${author.username}`}>
                        <div className="text-md"><b> {author.username} </b> </div>
                        </Link>
                    <Button type="text" size="small" style={{marginLeft:'auto'}} ><MoreOutlined style={{fontSize:'20px'}}/></Button> 
                </div>
                
                <Paragraph ellipsis={ellipsis ? {rows:2,expandable:true,symbol:"more"} : false} >
                    {item.caption}
                </Paragraph>
               
                <div className=" flex w-auto overflow-hidden">
                  { item.images && <Image  style={{borderRadius:'10px'}}  src={`http://localhost:8080/${item.images}`} />}
                </div>
                
                <div className="container">
                    <span>
                        <Button type="text"  size="small"  ><HeartOutlined style={{fontSize:'20px',color:'orangered'}} /></Button>
                        <div className="inline text-sm"><b> {item.likes.length} likes</b></div>
                    </span>
                    <span>
                        <Button type="text"  size="small"  ><CommentOutlined style={{fontSize:'20px'}} /></Button>
                        <div className="inline text-sm"><b> {item.comments.length} replies</b></div>
                    </span>
                </div>
                {/*<Collapse bordered={false} style={{background:'white'}}  >
                    <Panel header={`${item.comments.length} Replies`} >
                    { item.comments.map( (el,index) => {
                        return (
                            <div key={index} className="container flex flex-col space-y-4">
                                <div className="container flex items-start space-x-2">
                                <Avatar size="small" src={el.avatar} />
                                <Link to={`/p/${el.username}`} ><b>{el.username} </b></Link><span className="text-gray-600" > {el.comment}</span> 
                                </div>
                            </div>
                           
                            )
                    }) }
                        <div className="container flex items-center space-x-2 ">
                        <div><Avatar size="small" src={user.profile.avatar} /></div>
                        <Input stye={{width:'50%'}} bordered={false} placeholder="Add comment..." />
                        <Button type="text"> <SendOutlined/> </Button>
                        </div>
                    </Panel>
                </Collapse>*/}
            
            </div>
	)
}