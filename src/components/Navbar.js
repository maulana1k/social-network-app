import react,{useState,useContext} from 'react'
import {UserContext} from '../utilities/Context.js'
import axios from 'axios'

import {Avatar,AutoComplete,Input} from 'antd'
import {HomeOutlined,BellOutlined,UploadOutlined,SearchOutlined,CompassOutlined} from '@ant-design/icons'    
import {Link,useHistory} from 'react-router-dom'
import DefaultAvatar from '../assets/default-avatar.jpg'

export default function Navbar() {
	const [user] = useContext(UserContext)
	const [data,setData] = useState(null)

  console.log('nav',user)
	const url = 'https://api-socialite.herokuapp.com'
	const history = useHistory()
	const onSearch = key =>{ 
		if(key){
        axios.get(`${url}/search?username=${key}`)
        .then( res => {
          setData(res.data)
        }).catch( err => { console.log(err) } )
      }
      if(!key) {setData(null)}
	}
	const renderItem = (item,index) =>({
		value:item.username,
		label:(<>
			<div key={index} className="container flex  items-center space-x-2 text-gray-600 flex">
               <div>
               {item.profile.avatar ? <Avatar  src={`${url}/${item.profile.avatar}`} />
               : <Avatar src={DefaultAvatar} />
               }
               </div>
               <div className="container">
                   <b> {item.profile.fullname} </b>
                   <div className="text-gray-400 text-sm">@{item.username}</div>
               </div>
            </div>
			</>)
	})
	const searchItem = !data ? [] : data.map((el,i)=>renderItem(el,i))
		
  const style = {fontSize:'20px'}
	return(
		<div className="w-full hidden z-10 md:h-14 bg-white md:flex md:fixed z-20  shadow justify-center px-6 "
    >
			<div className="flex justify-between items-center w-9/12">
            <div style={{fontFamily:'Pacifico'}} className="text-gray-700 w-1/4 text-3xl">Socialite</div>
            <AutoComplete style={{width:'30%',borderRadius:'8px'}}
            	onSearch={onSearch}
            	options={searchItem}
            	onSelect={value=>history.push('/'+value)}>
                <Input style={{borderRadius:'6px'}} 
                prefix={ <SearchOutlined/> } 
                placeholder="Search people..." allowClear/>
            </AutoComplete>
            <div className="w-1/4 flex items-center justify-between">
               <Link className="nolink" to="/"><HomeOutlined style={style} /></Link>

               <Link className="nolink" to="/explore" ><CompassOutlined style={style} /></Link>

                <Link className="nolink" to="/uploads" > <UploadOutlined style={style}/></Link>

                <Link className="nolink" to="/notification" > <BellOutlined style={style} /></Link>

                <Link to={`/${user.username}`} >
                <div className="rounded-full border-2 border-white hover:border-blue-300" >
                <Avatar  src={`https://api-socialite.herokuapp.com/${user.profile.avatar}`} />
                </div>
                </Link> 

            </div>
			</div>
        </div>

		)
}