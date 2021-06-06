import React, {useState,useEffect,useContext} from 'react'
import axios from 'axios'
import {UserContext} from '../utilities/UserContext.js'
import {Link} from 'react-router-dom'

import {Avatar,Button,Tabs,Spin,Drawer} from 'antd'
import {SettingOutlined,TagOutlined,AppstoreOutlined,LoadingOutlined,EditOutlined,ArrowLeftOutlined} from '@ant-design/icons'

import Card from '../components/CardPost.js'


export default function Profile(props){
    const [user,setUser] = useContext(UserContext)
    const [profile,setProfile] = useState(null)
    const [userPost,setUserPost] = useState(null)
    const [isFollowing,setIsFollowing] = useState(false)
    const url = 'http://localhost:8080'
    const {TabPane} = Tabs
    console.log('user',user.username)
    console.log('p',profile)
    console.log('fol',isFollowing)
    useEffect(()=>{
        const getProfile = async () => {
            //getProfile
            await axios.get(`${url}/${props.username}/profile`)
            .then( res =>{
                setProfile(res.data)
                let followValidate = res.data.follower.filter( el =>{ return el.username === user.username })
                console.log('val',followValidate)
                setIsFollowing(followValidate.length!==0 ? true : false)
            }).catch( err =>{ console.log(err) })
            //getPosts
            await axios.get(`${url}/posts/${props.username}`)
            .then(res=>{
                setUserPost(res.data)
                console.log(userPost)
            }).catch( err =>{ console.log(err) })
        }
      getProfile();
    },[])
    const follow = () =>{
        if (isFollowing){
            axios.put(`${url}/${user.username}/unfollow/${props.username}`)
            .then( res => { 
                setProfile(res.data)
                setIsFollowing(false)
                console.log('p',profile) 
            })
        }else{
            axios.put(`${url}/${user.username}/follow/${props.username}`)
            .then( res => {
                setProfile(res.data)
                setIsFollowing(true)
                console.log(res.data)
            }).catch( err => { console.log(err) })
        }
    }
    const DrawerProfile = () =>{
        const [isOpen,setIsOpen] = useState(false)
        return(<>
                <Button type="text" onClick={()=>{ setIsOpen(true) }} > <SettingOutlined/> </Button>
                <Drawer 
                title="Settings"
                placement="right"
                closable={false}
                onClose={()=>{ setIsOpen(false) }}
                visible={isOpen}
                >
                <div className="container flex flex-col space-y-4">
                    <Link><div className="rounded-md container hover:bg-blue-50 focus:bg-blue-50" >Change Avatar</div></Link>
                    <Link><div className="rounded-md container hover:bg-blue-50 focus:bg-blue-50" >Edit Profile</div></Link>
                    <Link><div className="rounded-md container hover:bg-blue-50 focus:bg-blue-50" >About</div></Link>
                </div>
                </Drawer>
                </>
            )
    }
    return(
            <div className="container p-4 min-h-screen  flex flex-col bg-white">
             { profile ? (<>
                <div className="container flex justify-between">
                    <div className="text-gray-700 mb-2 text-lg space-x-4 ">
                    { user.username !== props.username && (
                        <Button type="text" onClick={()=>window.history.back()} >
                            <ArrowLeftOutlined style={{fontSize:'20'}} />
                        </Button>) 
                    }
                    @ {profile.username}
                    </div>
                    { user.username == props.username && <DrawerProfile/>} 
                </div>
                            <div className="flex py-4 items-start">
                             <div className="flex justify-center w-1/4 p-2 ">
                                 <div className="inline-block  rounded-full shadow ">
                                     <Avatar size={64} src={profile.profile.avatar}  />
                                 </div>
                             </div>
                             <div className="text-gray-800 w-3/4 flex flex-col p-4">
                                 <div className="text-lg text-left "> {profile.profile.fullname} </div>
                                 <div className="text-gray-500 text-md"> {profile.profile.bio} </div>
                             </div>
                            </div>
                             
                             <div className="rounded-md flex w-4/5  mx-auto shadow p-2 my-2 ">
                                 <div className="container grid  grid-cols-3 text-gray-800">
                                     <div className="container flex flex-col items-center justify-center">
                                         <b> { userPost && userPost.length} </b>
                                         <div className="text-gray-500 text-sm ">Posts</div>
                                     </div>
                                     <div className="container flex flex-col items-center justify-center">
                                         <b> {profile.follower.length} </b>
                                         <div className="text-gray-500 text-sm ">Followers</div>
                                     </div>
                                     <div className="container flex flex-col items-center justify-center">
                                         <b> {profile.following.length} </b>
                                         <div className="text-gray-500 text-sm ">Following</div>
                                     </div>
                                 </div>
                             </div>
                             <div className="container space-x-4 my-4">
                                { user.username !== props.username && (
                                     <Button type={isFollowing?'default' : 'primary'} onClick={follow} >
                                     { isFollowing ? 'Unfollow' : 'Follow' }
                                     </Button>
                                ) }
                                {user.username == props.username && (
                                    <Button  >
                                     <Link to="/update-profile" >Edit Profile</Link>
                                     </Button>
                                    )}
                             </div>
                             <Tabs centered defaultActiveKey='1' >
                                 <TabPane tab={<span><AppstoreOutlined/> Posts </span>} key='1' >
                                    <div className="space-y-4">
                                     { userPost && userPost.map( el => {
                                         return (
                                             <Card item={el} author={profile} />
                                             )
                                     }) }    
                                    </div>
                                 </TabPane>
                                 <TabPane tab={<span><TagOutlined/> Mentions </span>} key='2' >
                                 </TabPane>
                             </Tabs> 
                             </> ):
                             <div className="mx-auto my-auto">
                                 <LoadingOutlined style={{fontSize:'56px',color:'gray'}}/>
                             </div>
                         }
            </div>
            
    )
}