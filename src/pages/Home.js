import react,{useContext} from 'react'
import {UserContext,NotifProvider} from '../utilities/Context.js'

import {Avatar} from 'antd'
import {HomeOutlined,PlusCircleOutlined,BellOutlined,
        HomeFilled,PlusCircleFilled,BellFilled,CompassOutlined,CompassFilled} from '@ant-design/icons'    
import {Route,Switch,Link,useLocation} from 'react-router-dom'

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

const style = {fontSize:'22px'}
export default function Home(){
    const [user,setUser] = useContext(UserContext)
    const location = useLocation()
    const {pathname} = location
    
    return(
        <div className="min-h-screen m-0 w-full ">
            <Navbar/>
            <div className="flex min-h-screen justify-center">
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
                        {/*<NotifProvider>
                        </NotifProvider>*/}
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

            <div className="flex md:hidden justify-around items-center fixed inset-x-0 shadow-lg bottom-0 h-10 bg-white ">
                <div > 
                   <Link to="/">
                   { pathname=='/' ? <HomeFilled style={style} /> 
                    : <HomeOutlined style={style} /> }
                   </Link>
                    </div>
                <div > 
                   <Link to="/explore" >
                   {pathname=='/explore' ? <CompassFilled style={style}/> 
                   : <CompassOutlined style={style} />}
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
                    {pathname=='/notification' ? <BellFilled style={style} /> 
                    : <BellOutlined style={style}/> }
                    </Link>
                    </div>
                <div > 
                    <Link to={`/${user.username}`} >
                    <Avatar src={`https://api-socialite.herokuapp.com/${user.profile.avatar}`} />
                    
                    </Link> 
                </div>
            </div>


        </div>  
    )
}