import react,{useState,useContext} from 'react'
import {UserContext} from '../utilities/UserContext.js'

import {Avatar} from 'antd'
import {HomeOutlined,SearchOutlined,PlusCircleFilled,BellOutlined,UserOutlined} from '@ant-design/icons'    
import {Route,Switch,Link,Redirect,useHistory} from 'react-router-dom'

//pages
import Feeds from './Feeds.js'
import Profile from './Profile.js'
import Search from './Search.js'
import Notification from './Notification.js'
import Uploads from './Uploads.js'
import UpdateProfile from './UpdateProfile.js'
import Post from './Post.js'
import ListsPage from './ListsPage.js'

export default function Home(){
    const [user,setUser] = useContext(UserContext)
    
    return(
        <div className="container h-screen  ">
            <div className="container flex-col p-0 bg-gray-50">
                <Switch>
                    <Route path="/" exact  >
                        <Feeds/>
                    </Route>
                    <Route path="/explore" >
                        <Search/>
                    </Route>
                    <Route path="/uploads" exact >
                        <Uploads/>
                    </Route>
                    <Route path="/notification" >
                        <Notification/>
                    </Route>
                    <Route path="/update-profile" >
                        <UpdateProfile/>
                    </Route>
                    <Route path="/post/:postId" >
                        <Post/>
                    </Route>
                    <Route path="/likes/:postId" >
                        <ListsPage/>
                    </Route>
                    <Route path="/:username/follower" >
                        <ListsPage/>
                    </Route>
                    <Route path="/:username/following" >
                        <ListsPage/>
                    </Route>
                    <Route path="/:username" component={props=><Profile username={props.match.params.username} />} />
                </Switch>
                
            </div>

            <div className="flex justify-around border-t items-center fixed inset-x-0 shadow-lg bottom-0 h-14 bg-white ">
                <div > 
                   <Link to="/"><HomeOutlined style={{fontSize:'22px'}} /></Link>
                    </div>
                <div > 
                   <Link to="/explore" ><SearchOutlined style={{fontSize:'22px'}} /></Link>
                    </div>
                <div > 
                    <Link to="/uploads" > <PlusCircleFilled style={{fontSize:'40px'}}/></Link>
                    
                    </div>
                <div > 
                    <Link to="/notification" > <BellOutlined style={{fontSize:'22px'}}/></Link>
                    </div>
                <div > 
                    <Link to={`/${user.username}`} ><Avatar src={`http://localhost:8080/${user.profile.avatar}`} /></Link> 
                </div>
            </div>


        </div>  
    )
}