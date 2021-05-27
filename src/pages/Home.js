import react,{useState,useContext} from 'react'
import {UserContext} from '../utilities/UserContext.js'

import HomeOutlined from '@material-ui/icons/HomeOutlined'
import SearchRounded from '@material-ui/icons/SearchRounded'
import  AddBox from '@material-ui/icons/AddBox'
import  PersonOutlined from '@material-ui/icons/PersonOutlined'
import  NotificationsNoneRounded from '@material-ui/icons/NotificationsNoneRounded'
     
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import {Route,Switch,Link,Redirect,useHistory} from 'react-router-dom'

//pages
import Feeds from './Feeds.js'
import Profile from './Profile.js'
import Search from './Search.js'
import Notification from './Notification.js'
import Uploads from './Uploads.js'


export default function Home(){
    const [user,setUser] = useContext(UserContext)
    const [menu,setMenu] = useState(null)
    const [file,setFile] = useState(null)
    const [fileURL,setFileURL] = useState('')
    
    return(
        <div className="container h-screen  ">
            <div className="container flex-col p-0 bg-gray-50">
                <Switch>
                    <Route path="/search" >
                        <Search/>
                    </Route>
                    <Route path="/notification" >
                        <div className="container h-14 flex items-center bg-white px-4  ">
                            <div className="text-gray-700 text-xl"><b>Notifications</b></div>
                        </div>
                        <Notification/>
                    </Route>
                    <Route path="/:username"  >
                        <Profile/>
                    </Route>
                    <Route path="/" exact  >
                        <div className="container h-14 flex items-center bg-white px-4 ">
                            <div className="text-gray-700 text-xl"><b>Feeds</b></div>
                        </div>
                        <Feeds/>
                    </Route>
                    <Route to="/uploads" >
                        <div className="container h-14 flex items-center bg-white px-4 ">
                            <div className="text-gray-700 text-xl"><b>Uploads</b></div>
                        </div>
                        <Uploads  />
                    </Route>
                </Switch>
                
            </div>

            <div className="flex justify-around items-center fixed inset-x-0 filter drop-shadow-md bottom-0 h-14 bg-white ">
                <div > 
                   <Link to="/" > <HomeOutlined /></Link>
                    </div>
                <div > 
                   <Link to="/search" > <SearchRounded /></Link>
                    </div>
                <div > 
                    <Link to="/uploads" > <AddBox fontSize="large"  /></Link>
                    
                    </div>
                <div > 
                    <Link to="/notification" > <NotificationsNoneRounded/></Link>
                    </div>
                <div > 
                    <Link to={`/${user.username}`} ><PersonOutlined /></Link> 
                </div>
            </div>


        </div>  
    )
}