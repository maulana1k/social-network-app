import react,{useState,useContext,useEffect,useRef} from 'react'
import {UserContext} from '../utilities/UserContext.js'
import {Link,useParams,useHistory} from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'
import {Input,Avatar,Comment,List,Tag,Typography,Image,Button,Drawer,notification,Modal} from 'antd'
import {ArrowLeftOutlined,
        HeartOutlined,
        SendOutlined,
        MoreOutlined,
        DeleteOutlined,
        HeartFilled,
        EditOutlined,
        ShareAltOutlined,
        NotificationOutlined,
        ExclamationCircleOutlined} from '@ant-design/icons'

export default function Post() {
    const {postId} = useParams()
	const [post,setPost] = useState(null)
	const [user] = useContext(UserContext)
    const [likesCount,setLikesCount] = useState(0)
    const [isLiked,setIsLiked] = useState(false)
	const [ellipsis,setEllipsis] = useState(true)
	const [comment,setComment] = useState('')
    const [onEdit,setOnEdit] = useState(false)
    const [captionEdit,setCaptionEdit] = useState('')
    const [onReplies,setOnReplies] = useState(false)
    const [placeholder,setPlaceholder] = useState('Add comment...')
    const [replyTarget,setReplyTarget] = useState(null)
    const [refresh,setRefresh] = useState(false)

    const inputRef = useRef(null)

    const {TextArea} = Input
    const {confirm} = Modal
	const {Paragraph} = Typography 
	const url = 'https://api-socialite.herokuapp.com'
	const history = useHistory()
    const token = JSON.parse(localStorage.getItem('socialite-token'))
    console.log('post',post)
    console.log('token',token.token)
    useEffect(()=>{
        axios.get(`${url}/post/${postId}`)
        .then(res=>{
            let liked = res.data.likes.filter(el=>{return el.username === user.username })
            console.log(res.data,'likes',liked)
            setIsLiked(liked.length?true:false)
            setLikesCount(res.data.likes.length)
            setPost(res.data)
        }).catch(err=>{console.log(err.response)})
    },[refresh])

	const sendComment = () =>{
        let data = {
            username:user.username,
            avatar:user.profile.avatar,
            fullname:user.profile.fullname,
            comment}
        console.log('data',data)
        console.log('target',replyTarget)
        if(comment){
            if(!replyTarget){
                axios.put(`${url}/post/${postId}/comment/${user.username}`,data)
                .then(res=>{
                    console.log('comment',res.data)
                    setRefresh(!refresh)
                    // setPost(res.data)
                    setComment('')
                }).catch(err=>{console.log(err.response)})
            }else{
                axios.put(`${url}/post/${postId}/replies/${replyTarget}/by/${user.username}`,data)
                .then(res=>{
                    console.log('reply',res.data)
                    // setPost(res.data)
                    setComment('')
                    setReplyTarget(null)
                    setOnReplies(false)
                    setRefresh(!refresh)
                }).catch(err=>{console.log(err.response)})
            } 
        }
       
	}  

    const deletePost = () => {
        confirm({
        title:'Delete this post?',
        icon: <ExclamationCircleOutlined/>,
        okText:'delete',
        okType:'danger',
        cancelText:'cancel',
        onOk(){
            axios.delete(`${url}/post/${postId}`,{headers:{'authorization':token.token}})
            .then(res=>{
                console.log(res.data)
                notification['success']({
                        message:'Post deleted!',
                        description:'refresh your page.'
                    })
                history.push('/')
            }).catch(err=>{ 
                if(err.message) console.log(err.message)
                console.log(err.response) 
            })
            },
        onCancel() {console.log('cancel') }
        })
    }
    const deleteComment = commentId =>{
        axios.put(`${url}/post/${postId}/uncomment/${commentId}`)
        .then(res => {
            console.log('uncomment',res.data);
            setPost(res.data)
        }).catch(err=>{console.log(err.response)})
    }
    const likes = () =>{
        let likeOrUnlike = isLiked ? 'unlikes' : 'likes'
        let data = {fullname:user.profile.fullname,avatar:user.profile.avatar}
        let likesAdd = isLiked ? likesCount-1 : likesCount+1
        axios.put(`${url}/post/${postId}/${likeOrUnlike}/${user.username}`,data)
        .then(res=>{
            console.log(res.data)
            setLikesCount(likesAdd)
            setIsLiked(!isLiked)
        }).catch(err=>{console.log(err.response)})
    }
    const editPost = () =>{
        let data = {caption:captionEdit}
        console.log(data)
        axios.put(`${url}/post/${post._id}`,data,
            {headers:{'authorization':token.token}}
        ).then(res=>{
            console.log(res.data)
            setPost(res.data)
        }).catch(err=>{console.log(err.response)})
    }
	const [drawer,setDrawer] = useState(false)
	return(
		<div className="container min-h-screen pb-24 flex flex-col bg-white">
                <div className="p-4">
                    <div className="text-gray-700 mb-2 flex items-center text-lg space-x-4 ">
                        <ArrowLeftOutlined onClick={()=>window.history.back()} style={{fontSize:'24px'}} />
                    <b>Post</b>
                    </div>
                </div>
            { post && (<>
            <div className="container flex flex-col space-y-2 text-gray-700">
                <div className="container flex items-center px-4 space-x-2">
                        <Avatar size="small" src={`${url}/${post.author.profile.avatar}`} />
                        <Link to={`/${post.author.username}`}>
                        <div className="text-md flex flex-col">
                        <b> {post.author.profile.fullname}</b> 
                        <span className="text-xs text-gray-500" > @{post.author.username}</span>
                        </div>
                        </Link>
                        <Button type="text" size="small" onClick={()=>setDrawer(!drawer)} style={{marginLeft:'auto'}} ><MoreOutlined style={{fontSize:'20px'}}/></Button> 
                </div>
                <div className="px-4" >
                {onEdit ? (<>
                    <TextArea value={captionEdit} onChange={e=>setCaptionEdit(e.target.value)} placeholder="Text here..." showCount maxLength={200} autoSize={{minRows:4,maxRows:8}}  />
                    <div className="container py-2 space-x-2">
                        <Button size="small" type="text" onClick={()=>setOnEdit(false)} >cancel</Button>
                        <Button size="small" type="primary" onClick={editPost} >save</Button>
                    </div>
                    </>)
                : (<Paragraph style={{margin:'0',whiteSpace:'pre-line'}} ellipsis={ellipsis ? {rows:2,expandable:true,symbol:"more"} : false} >
                    {post.caption}
                   </Paragraph>)
                 }
                </div>
                
               
                  { post.images && ( 
		                <div className=" flex w-auto  overflow-hidden">
		                  	<Image style={{width:'100%'}} src={`${url}/${post.images}`} />
		                </div> )
                  }
                <div className="container space-y-2 px-4 ">
                    {  post.tag.map((el,i)=>{
                        return <Link key={i} to={`/${el}`} ><Tag color="processing">{el}</Tag></Link>
                    }) }
                    <div className="container flex justify-between" >
                        <div>
                            <Button type="text"  size="small" onClick={likes} >
                            { isLiked ? <HeartFilled style={{fontSize:'20px',color:'orangered'}} />  : <HeartOutlined style={{fontSize:'20px'}} />}
                            </Button>
                            <Link to={{pathname:`/likes/${postId}`,title:'Likes',data:post.likes}} ><div className="inline text-sm"><b> {likesCount} likes</b></div></Link>
                        </div>
                        <div className="text-xs text-gray-500">{moment(post.timestamps).fromNow()}</div>
                    </div>
                    <hr/>
                </div>
                <div className="container px-4 pb-12">
            	{post.comments.length === 0 && <div className="flex justify-center text-gray-700 py-6 ">No replies yet :(</div> }
                	{ post.comments.length>0 && (<>
                	<div className="text-sm py-2 "><b> {post.comments.length} comments </b></div><hr/>
                        <div className="divide-y">
                	{ post.comments.slice(0).reverse().map((el,index)=>{
                		return(
                			<Comment key={index}
                			author={<div className="text-gray-700">
                                    <Link to={`/${el.username}`} >{el.username}</Link>
                                    </div>}
                			avatar={ <Avatar src={`${url}/${el.avatar}`} /> }
                			content={ 
                                <div className="flex flex-col space-y-2" >
                                    <p>{el.comment}</p>
                                    <div className="flex space-x-2">
                                    { el.username!== user.username ? (
                                    <div onClick={()=>{
                                        setOnReplies(true);
                                        setReplyTarget(el._id);
                                        setPlaceholder(`Reply to ${el.username}`)
                                        inputRef.current.focus({cursor:'end'});
                                        }} 
                                        className="text-gray-500 text-xs ">
                                        Reply to
                                    </div> 
                                     ) : (
                                     <div onClick={()=>deleteComment(el._id)} className="text-gray-500 text-xs ">
                                        Unsend
                                    </div>
                                     ) }
                                     { el.timestamps && <div className="text-gray-500 text-xs">{moment(el.timestamps).fromNow()}</div> }
                                    </div>
                                </div>
                            } 
                			>
                				{ el.replies.length>0 && el.replies.map((rep,index)=>{
                					return(
                                        <div key={index} className="divide-y" >
                						<Comment key={index}
                						author={<div className="text-gray-700">
                                                <Link to={`/${el.username}`} >{el.username}</Link>
                                                </div>}
                						avatar={ <Avatar src={`${url}/${rep.avatar}`} /> }
                						content={ <p>{rep.comment}</p> }
                						/>
                                        </div>
                						)
                				}) }
                			</Comment>
                			)
                	}) }
                        </div>
            		</>)}
                </div>
            </div>
        	<div className="bg-white flex fixed inset-x-0 bottom-12 p-4 items-center md:mx-auto md:w-2/5 md:bottom-0 md:border ">
                { onReplies && (<div className=" flex justify-between">
                                <Button type="text" size="small" 
                                onClick={()=>{
                                    setOnReplies(false);
                                    setPlaceholder('Add comment...');
                                    setReplyTarget(null)
                                }} >
                                <span className="text-xs" >cancel</span>
                                </Button>
                                </div>)}
            	<div><Avatar size="small" src={`${url}/${user.profile.avatar}`} /></div>
            	<Input allowClear 
                ref={inputRef} 
                bordered={false} 
                value={comment} 
                onChange={e=>setComment(e.target.value)} 
                placeholder={placeholder} />
            	<SendOutlined onClick={sendComment}  style={{fontSize:'20px'}} />
        	</div>
            </>)}
            <Drawer
            placement="bottom"
            key="bottom"
            closable={false}
            onClose={()=>setDrawer(false)}
            visible={drawer}
            >
                <div className="text-gray-700 space-y-3">
                    { post && user.username === post.author.username ? (<>
                    <div className="flex items-center space-x-4 focus:bg-gray-100" onClick={()=>{setOnEdit(true);setCaptionEdit(post.caption)}} ><EditOutlined/> <b>Edit post</b></div>
                    <div className="flex items-center space-x-4 focus:bg-gray-100 " onClick={deletePost} ><DeleteOutlined/><b>Delete post</b></div>
                        </>) 
                    : (<>
                    <div className="flex items-center space-x-4 focus:bg-gray-100"
                    onClick={()=>{
                        notification['warning']({
                        message:'Share feature will available soon ',
                        description:'Stay tuned :)',
                        placement:'bottomRight'})
                    }} ><ShareAltOutlined/> <b>Share to</b></div>
                    <div className="flex items-center space-x-4 focus:bg-gray-100" 
                    onClick={()=>{
                        notification['warning']({
                        message:'Report feature will available soon ',
                        description:'Stay tuned :)',
                        placement:'bottomRight'})
                    }}><NotificationOutlined/> <b>Report</b></div>
                       </> )}
                       
                </div>
            </Drawer>
    </div>
		)
}