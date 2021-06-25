import react , {useState,useContext} from 'react'
import {UserContext,Content} from '../utilities/Context.js'
import axios from 'axios'
import moment from 'moment'

import {Avatar,Typography,Image,Button,Tag} from 'antd'
import {HeartOutlined,CommentOutlined,HeartFilled} from '@ant-design/icons'
import {Link,useHistory} from 'react-router-dom'


export default function Card({item,author}){
    const [user,setUser] = useContext(UserContext)
    const {exploreState,feedsState} = useContext(Content)
    const [ellipsis,setEllipsis] = useState(true)
    let liked = item.likes.filter(el=>{return el.username === user.username })
    const [isLiked,setIsLiked] = useState(liked.length?true:false)
    const [likesCount,setLikesCount] = useState(item.likes.length)
    const [explore,setExplore] = exploreState
    const [feeds,setFeeds,feedsPage,setFeedsPage] = feedsState

    const url = 'https://api-socialite.herokuapp.com'
    const {Paragraph} = Typography 
    const history = useHistory()
    const updateExplore = () =>{ 
      axios.get(`${url}/posts?page=0&limit=9`)
      .then(res => {
        setExplore([...res.data])
        console.log("data",res.data);
      }).catch (err=>{
        console.log('err',err)
      })
    }
    const updateFeeds = () =>{
      axios.get(`${url}/posts?page=0&limit=4&user=${user.username}`)
      .then(res => {
        setFeeds([...res.data])
        console.log("data",res.data);
      }).catch (err=>{
        console.log('err',err)
      })
    }
    const likes = () =>{
        let likeOrUnlike = isLiked ? 'unlikes' : 'likes'
        let likesAdd = isLiked ? likesCount-1 : likesCount+1
        let data = {fullname:user.profile.fullname,avatar:user.profile.avatar}
        setIsLiked(!isLiked)
        setLikesCount(likesAdd)
        axios.put(`${url}/post/${item._id}/${likeOrUnlike}/${user.username}`,data)
        .then(res=>{
            console.log(res.data)
            updateExplore()
            updateFeeds()
        }).catch(err=>{console.log(err.response)})
    }
    
	return (<div>
        
                
		 <div className="hover:bg-blue-50 container flex flex-col flex-shrink-1 space-y-2 text-gray-700 rounded-xl md:border bg-white p-2 ">
            <Link to={`/post/${item._id}`} >
            <div className="flex justify-between">
                <div className="flex items-center  space-x-4">
                         <Avatar size="medium" src={`${url}/${author.profile.avatar}`} />
                        
                        <Link to={`/${author.username}`}>
                        <div className="text-md text-gray-800 flex flex-col">
                        <b> {author.profile.fullname}</b> 
                        <span className="text-xs " > @{author.username}</span>
                        </div>
                        </Link>
                </div>
                        
            </div>
                <Paragraph style={{whiteSpace:'pre-line'}} ellipsis={ellipsis ? {rows:2,expandable:true,symbol:"more"} : false} >
                    {item.caption}
                </Paragraph>
                
                    
                <div className=" flex w-auto -mx-2 rounded-xl md:rounded-none overflow-hidden">
                  { item.images && <Image  style={{width:'100%',margin:'auto'}}  src={`${url}/${item.images}`} />}
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
                            <Link className="nolink" to={{pathname:`/likes/${item._id}`,title:'Likes',data:item.likes}} >
                            <div className="inline text-sm"><b> {likesCount} likes</b></div>
                            </Link>
                        </span>
                        <span>
                        <Link className="nolink" to={`/post/${item._id}`} >
                            <Button type="text"  size="small"  ><CommentOutlined style={{fontSize:'20px'}} /></Button>
                            <div className="inline text-sm"><b> {item.comments.length} comments</b></div>
                        </Link>
                        </span>
                        <div className="text-xs float-right text-gray-500">{moment(item.timestamps).fromNow()}</div>
                    </div>
                </div>
                
            </div>
            
    </div>
	)
}