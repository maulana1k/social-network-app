import react,{useState,useContext} from 'react'
import {UserContext} from '../utilities/UserContext.js'

import {HomeOutlined,SearchOutlined,PlusCircleFilled,BellOutlined,UserOutlined} from '@ant-design/icons'    
import {Route,Switch,Link,Redirect,useHistory} from 'react-router-dom'

//pages
import Feeds from './Feeds.js'
import Profile from './Profile.js'
import Search from './Search.js'
import Notification from './Notification.js'
import Uploads from './Uploads.js'
import UpdateProfile from './UpdateProfile.js'

export default function Home(){
    const [user,setUser] = useContext(UserContext)
    
    return(
        <div className="container h-screen  ">
            <div className="container flex-col p-0 bg-gray-50">
                <Switch>
                    <Route path="/" exact  >
                        <Feeds/>
                    </Route>
                    <Route path="/search" >
                        <Search/>
                    </Route>
                    <Route path="/uploads" exact >
                        <Uploads/>
                    </Route>
                    <Route path="/notification" >
                        <Notification/>
                    </Route>
                    <Route path="/p/:username" component={props=><Profile username={props.match.params.username} />} />
                    <Route path="/update-profile" component={props=><UpdateProfile userProfile={user.profile} />} />
                </Switch>
                
            </div>

            <div className="flex justify-around items-center fixed inset-x-0 shadow-lg bottom-0 h-14 bg-white ">
                <div > 
                   <Link to="/" > <HomeOutlined style={{fontSize:'20px'}} /></Link>
                    </div>
                <div > 
                   <Link to="/search" ><SearchOutlined style={{fontSize:'20px'}} /></Link>
                    </div>
                <div > 
                    <Link to="/uploads" > <PlusCircleFilled style={{fontSize:'40px'}}/></Link>
                    
                    </div>
                <div > 
                    <Link to="/notification" > <BellOutlined style={{fontSize:'20px'}}/></Link>
                    </div>
                <div > 
                    <Link to={`/p/${user.username}`} ><UserOutlined style={{fontSize:'20px'}} /></Link> 
                </div>
            </div>


        </div>  
    )
}