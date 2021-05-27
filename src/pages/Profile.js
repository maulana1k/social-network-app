import React, {useState,useEffect,useContext} from 'react'
import axios from 'axios'
import {UserContext} from '../utilities/UserContext.js'

import {Avatar,Text,Button,Tab,Tabs,TabPanels,TabList,TabPanel,Heading} from '@chakra-ui/react'
import AlternateEmail from '@material-ui/icons/AlternateEmail'
import Card from '../components/CardPost.js'

export default function Profile(props){
    const [user,setUser] = useContext(UserContext)
    const [profile,setProfile] = useState([])
    const [userPost,setUserPost] = useState([])
    const [isFollowing,setIsFollowing] = useState(
        user.following.filter(el => {return el.username == profile.username} )
    )
    const url = 'http://localhost:8080'
    
    useEffect(()=>{
        //getProfile
        axios.get(`${url}/${props.match.params.username}`)
        .then( res =>{
            setProfile(res.data)
        }).catch( err =>{ console.log(err) })
        //getPosts
        axios.get(`${url}/posts/${props.match.params.username}`)
        .then(res=>{
            setUserPost(res.data)
        }).catch( err =>{ console.log(err) })

    },[])

    const follow = () =>{
        axios.put(`${url}/${user.username}/follow/${props.match.params.username}`)
        .then( res => {
            console.log(res.data)
        }).catch( err => { console.log(err) })
    }
    return(

        <div className="container p-4 flex-col bg-white">
        <div className="text-gray-700 mb-2 text-lg"><AlternateEmail/>{profile.username}</div>

        <div className="flex justify-center ">
            <div className="inline-block border-4 border-white rounded-full shadow ">
                <Avatar size="lg"  />
            </div>
        </div>
        <div className="text-gray-800 flex flex-wrap align-center justify-center p-4">
            <div className="text-lg"> {profile.profile.fullname} </div>
            <div className="text-gray-400 text-md w-4/5"> {profile.profile.bio} </div>
        </div>
        
        <div className="container rounded-md shadow p-2 my-2 ">
            <div className="container grid grid-cols-4 text-gray-800">
                <div className="container flex flex-col items-center justify-center">
                    <b> {userPost.length} </b>
                    <div className="text-gray-500 text-sm ">Photos</div>
                </div>
                <div className="container flex flex-col items-center justify-center">
                    <b> {profile.follower.length} </b>
                    <div className="text-gray-500 text-sm ">Followers</div>
                </div>
                <div className="container flex flex-col items-center justify-center">
                    <b> {profile.Following.length} </b>
                    <div className="text-gray-500 text-sm ">Following</div>
                </div>
            </div>
        </div>
        <div className="container space-x-4 my-4">
            <Button colorScheme="blue"  size="sm" onClick={follow} >
            { isFollowing ? 'Unfollow' : 'Follow' }
            </Button>
        </div>
        <Tabs isFitted variant="enclosed" >
            <TabList >
                <Tab>Photos</Tab>
                <Tab>Tweets</Tab>
            </TabList>
            <TabPanels className="p-0">
                <TabPanel > 
                    { userPost.map( el => {
                        return (
                            <Card item={el} subject={profile} />
                            )
                    }) }
                
                    {/*<div className="container grid grid-cols-2 auto-rows-max gap-1">
                        <div className="w-36 h-36 bg-indigo-700"></div>
                        <div className="w-36 h-36 bg-indigo-700"></div>
                        <div className="w-36 h-36 bg-indigo-700"></div>
                        <div className="w-36 h-36 bg-indigo-700"></div>
                        <div className="w-36 h-36 bg-indigo-700"></div>
                        <div className="w-36 h-36 bg-indigo-700"></div>
                    </div>*/}
                </TabPanel>
                <TabPanel>Tweetss</TabPanel>
            </TabPanels>
        </Tabs>
        </div>

    )
}