import react,{useState,useContext,useEffect} from 'react'
import {UserContext} from '../utilities/UserContext.js'


import {Avatar,AutoComplete,Input} from 'antd'
import {HomeOutlined,SearchOutlined,PlusCircleOutlined,BellOutlined,
        HomeFilled,PlusCircleFilled,BellFilled} from '@ant-design/icons'    
import {Route,Switch,Link,Redirect,useHistory,useLocation} from 'react-router-dom'
import Geolocation from '../utilities/Geolocation.js'
import DefaultAvatar from '../assets/default-avatar.jpg'
//pages
import Feeds from './Feeds.js'
import Profile from './Profile.js'
import Search from './Search.js'
import Notification from './Notification.js'
import Uploads from './Uploads.js'
import UpdateProfile from './UpdateProfile.js'
import Post from './Post.js'
import ListsPage from './ListsPage.js'
import Navbar from '../components/Navbar.js'

export default function Home(){
    const [user,setUser] = useContext(UserContext)
    const location = useLocation()
    const {pathname} = location
    
    return(
        <div className="min-h-screen m-0 w-full ">
            <Navbar/>
            <div className="flex min-h-screen justify-center bg-white">
            <div className="md:py-14 w-full mx-auto md:w-2/5">
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
                    <Route path="/:username" >
                        <Profile/>
                    </Route>
                </Switch>
            </div>
                
            </div>

            <div className="flex md:hidden justify-around border-t items-center fixed inset-x-0 shadow-lg bottom-0 h-14 bg-white ">
                <div > 
                   <Link to="/">
                   { pathname=='/' ? <HomeFilled style={{fontSize:'22px'}} /> 
                    : <HomeOutlined style={{fontSize:'22px'}} /> }
                   </Link>
                    </div>
                <div > 
                   <Link to="/explore" >
                   <SearchOutlined style={{fontSize:'22px'}} />
                   </Link>
                    </div>
                <div > 
                    <Link to="/uploads" >
                    {pathname=='/uploads' ? <PlusCircleFilled style={{fontSize:'28px'}} />
                    : <PlusCircleOutlined style={{fontSize:'28px'}}/>}
                    </Link>
                    
                    </div>
                <div > 
                    <Link to="/notification" > 
                    {pathname=='/notification' ? <BellFilled style={{fontSize:'22px'}} /> 
                    : <BellOutlined style={{fontSize:'22px'}}/> }
                    </Link>
                    </div>
                <div > 
                    <Link to={`/${user.username}`} >
                    {user.profile.avatar ? <Avatar src={`https://api-socialite.herokuapp.com/${user.profile.avatar}`} />
                    : <Avatar src={DefaultAvatar} />
                    }
                    </Link> 
                </div>
            </div>


        </div>  
    )
}