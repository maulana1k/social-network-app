import react from 'react'
import {HomeOutlined,
        SearchRounded,
        AddCircleRounded,
        PersonOutlined,
        NotificationsNoneRounded
    } from '@material-ui/icons'
import {Route,Switch,Link} from 'react-router-dom'

import Feeds from './Feeds.js'
import Profile from './Profile.js'
import Search from './Search.js'
import Notification from './Notification.js'

export default function Home(){

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
                    <Route path="/profile" >
                        <Profile/>
                    </Route>
                    <Route path="/" exact  >
                    <div className="container h-14 flex items-center bg-white px-4 ">
                        <div className="text-gray-700 text-xl"><b>Feeds</b></div>
                    </div>
                        <Feeds/>
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
                    <Link to="/post" > <AddCircleRounded fontSize="large" /></Link>
                    </div>
                <div > 
                    <Link to="/notification" > <NotificationsNoneRounded/></Link>
                    </div>
                <div > 
                    <Link to="/profile" ><PersonOutlined/></Link> 
                </div>
            </div>


        </div>  
    )
}