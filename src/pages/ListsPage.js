import react,{useState} from 'react'
import {Link,useLocation} from 'react-router-dom'

import {Avatar,Empty} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'

export default function ListsPage({}){
  const location = useLocation()
  const {data,title} = location
  const [item,setItem] = useState(data)
  console.log('item',item)
  const url = 'https://api-socialite.herokuapp.com'
	return(
		<div className="container min-h-screen flex flex-col pb-24">
			<div className="p-4 bg-white border-b">
          <div className="text-gray-700  flex items-center text-lg space-x-4 ">
              <ArrowLeftOutlined onClick={()=>window.history.back()} style={{fontSize:'24px'}} />
          <b>{title}</b>
          </div>
      </div>
      <div className="container px-4 space-y-4">
      { item.length>0 && item.map((el,i)=>{
        return(
        	<Link key={i} to={`/${el.username}`} >  
            <div className="container flex p-4 my-2  rounded-md shadow-sm items-center hover:bg-blue-50 focus:bg-blue-50 space-x-2 text-gray-600 bg-white flex">
               <div><Avatar  src={`${url}/${el.avatar}`} /></div>
               <div className="container">
                   <b> {el.fullname} </b>
                   <div className="text-gray-400 text-sm">@{el.username}</div>
               </div>
            </div>
            </Link>
            )
        })  
      }
      </div>
      { item.length==0 && (
          <div className="container flex  items-center my-auto justify-center text-gray-500">
            <Empty/>
          </div>  
        )}
		</div>
		)
}