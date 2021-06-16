import react,{useState,useContext} from 'react'
import {UserContext} from '../utilities/UserContext.js'
import axios from 'axios'

import {Avatar,AutoComplete,Input} from 'antd'
import {HomeOutlined,PlusCircleFilled,PlusSquareFilled,BellOutlined,UploadOutlined,SearchOutlined,CompassOutlined} from '@ant-design/icons'    
import {Link,useHistory} from 'react-router-dom'

export default function Navbar() {
	const [user] = useContext(UserContext)
	const [data,setData] = useState(null)

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
               <div><Avatar  src={`${url}/${item.profile.avatar}`} /></div>
               <div className="container">
                   <b> {item.profile.fullname} </b>
                   <div className="text-gray-400 text-sm">@{item.username}</div>
               </div>
            </div>
			</>)
	})
	const searchItem = !data ? [] : data.map((el,i)=>renderItem(el,i))
		

	return(
		<div className="w-full hidden z-10 md:h-14 md:flex md:fixed z-20 shadow justify-center  bg-white  px-6 ">
			<div className="flex justify-between items-center w-9/12">
            <div style={{fontFamily:'Pacifico'}} className="text-gray-700 w-1/4 text-3xl">Socialite</div>
            <AutoComplete style={{width:'25%',borderRadius:'10px'}}
            	onSearch={onSearch}
            	options={searchItem}
            	onSelect={value=>history.push('/'+value)}>
                <Input style={{borderRadius:'6px'}} 
                prefix={ <SearchOutlined/> } 
                placeholder="Search people..." allowClear/>
            </AutoComplete>
            <div className="w-1/4 flex items-center justify-between">
               <Link to="/"><HomeOutlined style={{fontSize:'20px'}} /></Link>

               <Link to="/explore" ><CompassOutlined style={{fontSize:'20px'}} /></Link>

                <Link to="/uploads" > <UploadOutlined style={{fontSize:'20px'}}/></Link>

                <Link to="/notification" > <BellOutlined style={{fontSize:'20px'}} /></Link>

                <Link to={`/${user.username}`} ><Avatar src={`http://localhost:8080/${user.profile.avatar}`} /></Link> 

            </div>
			</div>
        </div>

		)
}