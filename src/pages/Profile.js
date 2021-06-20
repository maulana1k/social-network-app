import React, {useState,useEffect,useContext,useRef} from 'react'
import axios from 'axios'
import {UserContext} from '../utilities/UserContext.js'
import {Link,useHistory,useParams} from 'react-router-dom'
import logo from '../assets/logo192.png'

import {Avatar,Button,Tabs,Spin,Drawer,Image,Dropdown,Menu,notification,Modal,Empty} from 'antd'
import {SettingOutlined,TagOutlined,AppstoreOutlined,Loading3QuartersOutlined,EditOutlined,ArrowLeftOutlined,
        UserSwitchOutlined,LogoutOutlined,ExclamationCircleOutlined,ProfileOutlined} from '@ant-design/icons'

import Card from '../components/CardPost.js'
import DefaultAvatar from '../assets/default-avatar.jpg'

export default function Profile(){
    const props = useParams()
    const [user,setUser] = useContext(UserContext)
    const [profile,setProfile] = useState(null)
    const [userPost,setUserPost] = useState(null)
    const [postMentions,setPostMentions] = useState(null)
    const [isFollowing,setIsFollowing] = useState(false)

    const url = 'https://api-socialite.herokuapp.com'
    const history = useHistory()
    const {confirm} = Modal
    const {TabPane} = Tabs
   
    useEffect(()=>{
       
        
            setProfile(null)
            //getProfile
             axios.get(`${url}/${props.username}/profile`)
            .then( res =>{
                console.log('profile',res.data)
                setProfile(res.data)
                let followValidate = res.data.follower.filter( el =>{ return el.username === user.username })
                setIsFollowing(followValidate.length!==0 ? true : false)
                if(props.username === user.username) {
                    localStorage.setItem('socialite-user',JSON.stringify(res.data))
                }
            }).catch( err =>{ console.log(err) })
            //getPosts
             axios.get(`${url}/posts/${props.username}`)
            .then(res=>{
                setUserPost(res.data)
                
            }).catch( err =>{ console.log(err) })
            //getMentions
             axios.get(`${url}/posts/${props.username}/mentions`)
            .then(res=>{
                setPostMentions(res.data)
               
            }).catch(err=>{ console.log(err) })
        
        //geolocation
        // if(navigator.geolocation){
        //     navigator.geolocation.getCurrentPosition(position=>{
        //         const Lat = position.coords.latitude
        //         const Lng = position.coords.longitude
        //         console.log('position ',position)
        //         console.log('latlng',Lat,Lng)
        //     })
        // }else{ console.log('geolocation unavailable') }
        // axios.get('https://geolocation-db.com/json/')
        // .then(res=>{ console.log('location',res.data) })
      
    },[props.username])


    //follow
    const follow = () =>{
        let followOrUnfollow = isFollowing ? 'unfollow' : 'follow'
        let data = {fullname:user.profile.fullname,avatar:user.profile.avatar}
        axios.put(`${url}/${user.username}/${followOrUnfollow}/${props.username}`,data)
        .then( res => { 
            setProfile(res.data)
            setIsFollowing(!isFollowing)
            console.log('p',profile) 
        }).catch(err=>{console.log(err.response)})
        
    }
    const profileMenu = () =>{
        return(
        <Menu>
            <Menu.Item>
                <Button onClick={()=>{
                        confirm({
                            title:'Sign out?',
                            okText:'next',
                            cancelText:'cancel',
                            icons:<ExclamationCircleOutlined/>,
                            onOk(){
                                localStorage.removeItem('socialite-user')
                                localStorage.removeItem('socialite-token')
                                setUser(null)
                                history.push('/signin')
                            },
                            onCancel(){ console.log('cancel') }
                        })
                }} style={{display:'flex',alignItems:'center'}} type="text" 
                icon={<LogoutOutlined/>} >
                Sign out
                </Button>
            </Menu.Item>
        </Menu>
            )
        
        
    }
    const contact = item =>{
        return(
        <Menu>
            <Menu.Item>
                <b>Phone</b>
                <div className="text-gray-500">{item}</div>
            </Menu.Item>
        </Menu>
            )
    }
    return(
            <div className="container p-4 min-h-screen mb-24 flex flex-col bg-white">
             { userPost && profile ? (<>
                <div className="container flex py-2 items-center justify-between">
                    <div className="">
                        <div className="text-gray-700 text-md flex items-center space-x-2 ">
                            { user.username !== props.username && 
                            <ArrowLeftOutlined onClick={()=>window.history.back()} style={{fontSize:'24px'}} />
                            }
                            <div className=" text-lg" ><b>@ {profile.username}</b></div>
                        { user.username == props.username && (
                            <Dropdown overlay={profileMenu}>
                                <Button  type="text" size="small" style={{display:'flex',alignItems:'center'}}>
                                <UserSwitchOutlined style={{fontSize:'20px'}}/>
                                </Button>
                            </Dropdown>
                            )} 
                        </div>
                    </div>
                    <div className="text-gray-500 text-xs">version 0.1.0 (beta)</div>
                        {/*{user.username == props.username && (
                            <Button style={{display:'flex',alignItems:'center'}} type="text" ><ProfileOutlined style={{fontSize:'20px'}} /></Button>
                            )}*/}
                </div>      
                        <div className="w-full rounded-lg h-40 z-0 overflow-hidden" >
                            { profile.profile.avatar 
                              ? (<div className="w-full h-full flex filter blur-sm" >
                                   <Image src={`${url}/${profile.profile.avatar}`} />
                                  </div>)
                                : <div className="w-full h-full border bg-gradient-to-tr from-indigo-400 to-blue-300"></div> }
                        </div>
                            <div className="flex px-4 -mt-12 z-10 space-x-3 items-center">
                             <div className="flex justify-center w-1/4 p-2 ">
                                 <div className="inline-block rounded-full p-1 shadow bg-white">
                                  <Avatar size={76} src={`${url}/${profile.profile.avatar}`}  />
                                 
                                 </div>
                             </div>
                             <div className="rounded-md flex w-4/5 bg-white mx-auto shadow-sm p-1  ">
                                 <div className="container grid text-md grid-cols-3 text-gray-800">
                                     <div className="container flex flex-col hover:bg-gray-50 text-gray-600 text-lg  items-center justify-center">
                                         <b> { userPost && userPost.length} </b>
                                         <div className="text-gray-500 text-sm ">Posts</div>
                                     </div>
                                    <Link to={{pathname:`/${profile.username}/follower`,title:'Follower',data:profile.follower}} >
                                     <div 
                                         className="container flex flex-col hover:bg-gray-50 text-gray-600 text-lg items-center justify-center">
                                         <b> {profile.follower.length} </b>
                                         <div className="text-gray-500 text-sm ">Followers</div>
                                     </div>
                                    </Link>
                                    <Link to={{pathname:`/${profile.username}/following`,title:'Following',data:profile.following}} >
                                    <div 
                                         className="container flex flex-col hover:bg-gray-50 text-gray-600 text-lg items-center justify-center">
                                        <b> {profile.following.length} </b>
                                        <div className="text-gray-500 text-sm ">Following</div>
                                    </div>
                                    </Link>
                                 </div>
                             </div>
                            </div>
                             <div className="text-gray-800 w-2/3 flex flex-col p-4">
                                 <div className="text-lg text-left "> {profile.profile.fullname} </div>
                                 <div className="text-gray-500 text-md whitespace-pre-line"> {profile.profile.bio} </div>
                                 { profile.profile.websites && (<>
                                    <div className="text-left mt-4"> Websites</div>
                                   <div className="text-gray-500 text-md "><a target="_blank" rel="noreferrer" href={`http://${profile.profile.websites}`}>{profile.profile.websites}</a></div>
                                   </>)}
                             </div>
                             
                             <div className="container space-x-4 my-4">
                                { user.username !== props.username && (<>
                                     <Button type={isFollowing?'default' : 'primary'} onClick={follow} >
                                     { isFollowing ? 'Unfollow' : 'Follow' }
                                     </Button>
                                     <Dropdown overlay={contact(profile.profile.phone)}>
                                         <Button>Contact</Button>
                                     </Dropdown>
                                     
                                     <Button onClick={()=>{
                                        notification['warning']({
                                        message:'Message feature will available soon ',
                                        description:'Stay tuned :)',
                                        placement:'bottomRight'})
                                    }} >Message</Button>
                                     </>
                                ) }
                                {user.username == props.username && (
                                    <div className="w-3/5 mx-auto">
                                    <Button block>
                                     <Link to={{pathname:'/update-profile',userProfile:profile.profile }}>Edit Profile</Link>
                                     </Button>
                                    </div>
                                    )}
                             </div>
                             <Tabs centered defaultActiveKey='1' >
                                 <TabPane tab={<span><AppstoreOutlined/> Posts </span>} key='1' >
                                    <div className="space-y-4 mb-24">
                                     { userPost.length>0 ? userPost.map( (el,index) => {
                                         return <Card item={el} author={profile} key={index} />    
                                     }):<div className="flex justify-center" >
                                            <div className="text-gray-500 text-lg">No Posts</div>
                                         </div> }    
                                    </div>
                                 </TabPane>
                                 <TabPane tab={<span><TagOutlined/> Mentions </span>} key='2' >
                                    <div className="space-y-4 mb-24">
                                    { postMentions && postMentions.length>0 ? postMentions.map((el,index)=>{
                                        return <Card item={el} author={el.author} key={index} />    
                                    }):<div className="flex justify-center" >
                                            <div className="text-gray-500 text-lg">No Posts</div>
                                         </div> }
                                    </div>
                                 </TabPane>
                             </Tabs> 
                             </> ):
                             <div className="mx-auto  my-auto">
                                {/*<Image src={logo} />*/}
                                 <Loading3QuartersOutlined style={{fontSize:'56px',color:'gray'}} spin />
                             </div>
                         }
            </div>
            
    )
}