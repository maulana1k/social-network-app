import react , {useState,useContext} from 'react'
import {UserContext} from '../utilities/UserContext.js'
import axios from 'axios'
import moment from 'moment'

import {Input,Avatar,Comment,Typography,Image,Button,Menu,Dropdown,Tag,notification} from 'antd'
import {HeartOutlined,SendOutlined,CommentOutlined,HeartFilled} from '@ant-design/icons'
import {Link,useHistory} from 'react-router-dom'


export default function Card({item,author}){
    const [user,setUser] = useContext(UserContext)
    const [ellipsis,setEllipsis] = useState(true)
    let liked = item.likes.filter(el=>{return el.username === user.username })
    const [isLiked,setIsLiked] = useState(liked.length?true:false)
    const [likesCount,setLikesCount] = useState(item.likes.length)
    const time = item.timestamps
    const [timestamps,setTimestamps] = useState(moment(time).fromNow())

    const url = 'http://localhost:8080'
    const {Paragraph} = Typography 
    const history = useHistory()

    const deletePost = () => {
        axios.delete(`${url}/post/${item._id}`,{headers:{'authorization':user.token}})
        .then(res=>{
            console.log(res.data)
            notification['success']({
                    message:'Post deleted!',
                    description:'refresh your page.'
                })
            history.push('/')
        }).catch(err=>{ console.log(err.response) })
    }

    const likes = () =>{
        let likeOrUnlike = isLiked ? 'unlikes' : 'likes'
        let likesAdd = isLiked ? likesCount-1 : likesCount+1
        let data = {fullname:user.profile.fullname,avatar:user.profile.avatar}
        axios.put(`${url}/post/${item._id}/${likeOrUnlike}/${user.username}`,data)
        .then(res=>{
            console.log(res.data)
            setLikesCount(likesAdd)
            setIsLiked(!isLiked)
        }).catch(err=>{console.log(err.response)})
    }
    
	return (
		 <div className="container flex flex-col flex-shrink-1 space-y-3 text-gray-700 rounded-md  bg-white p-2 ">
            <div className="flex justify-between">
                <div className="flex items-center  space-x-4">
                        <Avatar size="medium" src={`${url}/${author.profile.avatar}`} />
                        <Link to={`/${author.username}`}>
                        <div className="text-md flex  flex-col">
                        <b> {author.profile.fullname}</b> 
                        <span className="text-xs text-gray-500" > @{author.username}</span>
                        </div>
                        </Link>
                </div>
                        
            </div>
                
                <Paragraph style={{whiteSpace:'pre-line'}} ellipsis={ellipsis ? {rows:2,expandable:true,symbol:"more"} : false} >
                    {item.caption}
                </Paragraph>
                <Link to={`/post/${item._id}`} >
                <div className=" flex w-auto overflow-hidden">
                  { item.images && <Image  style={{borderRadius:'10px',width:'100%'}}  src={`http://localhost:8080/${item.images}`} />}
                </div>
                </Link>
                <div className="container space-y-2 ">
                    {  item.tag.map((el,i)=>{
                            return <Link key={i} to={`/${el}`} ><Tag color="processing">{el}</Tag></Link>
                        }) }
                    <div className="container space-x-4 ">
                        <span>
                            <Button type="text"  size="small" onClick={likes} >
                            { isLiked ? <HeartFilled style={{fontSize:'20px',color:'orangered'}} />  : <HeartOutlined style={{fontSize:'20px'}} />}
                            </Button>
                            <Link to={{pathname:`/likes/${item._ic}`,title:'Likes',data:item.likes}} >
                            <div className="inline text-sm"><b> {likesCount} likes</b></div>
                            </Link>
                        </span>
                        <span>
                        <Link to={`/post/${item._id}`} >
                            <Button type="text"  size="small"  ><CommentOutlined style={{fontSize:'20px'}} /></Button>
                            <div className="inline text-sm"><b> {item.comments.length} comments</b></div>
                        </Link>
                        </span>
                        <div className="text-xs float-right text-gray-500">{timestamps}</div>
                    </div>
                </div>
                
            </div>
	)
}