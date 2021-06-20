import React,{useState,useEffect} from 'react'
import axios from 'axios'

import Card from '../components/CardPost.js'
import {Input,Avatar,Image,AutoComplete,Divider,Button} from 'antd'
import {SearchOutlined,Loading3QuartersOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import DefaultAvatar from '../assets/default-avatar.jpg'

export default function Search(){
    const [query,setQuery] = useState(null)
    const [result,setResult] = useState(null)
    const [page,setPage] = useState(0) 
    const [posts,setPosts] = useState([])

    const url = 'https://api-socialite.herokuapp.com'

    console.log('page',page)

    useEffect(()=>{
      axios.get(`${url}/posts?page=${page}&limit=9`)
      .then(res => {
        setPosts(posts.concat(res.data))
        console.log("data",res.data);
      }).catch (err=>{
        console.log('err',err)
      })


    },[page])

    const handleSearch = (e) => {
      let key = e.currentTarget.value.toLowerCase()
      setQuery(key)
      if(key){
        axios.get(`${url}/search?username=${key}`)
        .then( res => {
          setResult(res.data)
        }).catch( err => { console.log(err) } )
      }
      if(!key) {setResult(null)}
    }

    return (<>
        <div className="container md:hidden flex bg-white px-12 py-1 h-14 border-b justify-center items-center">
          {/*<AutoComplete
          options={}
          >
          </AutoComplete>*/}
            <Input style={{borderRadius:'6px'}} allowClear onChange={handleSearch} name="search"
            size="large"  placeholder="lets find people..." prefix={ <SearchOutlined/> } />
        </div>
        <div className="container  space-y-4 pb-14 items-center  ">
          { query && result && result.map((el,i) => {
            return (
                <Link key={i} to={`/${el.username}`} >  
                <div className="container flex p-4 my-2 rounded-md shadow-sm items-center hover:bg-blue-50 focus:bg-blue-50 space-x-2 text-gray-600 bg-white flex">
                   <div>
                   <Avatar  src={`${url}/${el.profile.avatar}`} />
                   
                   </div>
                   <div className="container">
                       <b> {el.profile.fullname} </b>
                       <div className="text-gray-400 text-sm">@{el.username}</div>
                   </div>
                </div>
                </Link>

              )
          }) }
          { query && result && result.length==0 && <div className="text-gray-400 text-center my-6 ">Oops! can't found "{ query }" </div> }
          
          { !result && !query && posts.length>0 && (
              <div className="container  ">
                  <div className="text-gray-500 my-4 text-xl text-center ">Explore</div><hr/>
                  <div className="container grid grid-cols-3 my-2  ">
              { posts.map( (item,i) =>{
                if(item.images){
                   return(
                    <Link key={i} to={`/post/${item._id}`} >
                      <div className="flex items-center border gap-0 bg-white">
                       <Image src={`${url}/${item.images}`} />
                      </div>
                    </Link>
                    )
                }
              }) } 
                  </div>
                  <div className="my-4">
                    <Divider plain><Button type="text" onClick={()=>setPage(page+1)} >view more</Button>  </Divider>
                  </div>
              </div>  
            ) }
          { posts.length===0 && (
              <div className="py-4 mb-12 flex container justify-center">
                <div><Loading3QuartersOutlined style={{fontSize:'56px',color:'gray'}} spin /></div>              
                </div>
            ) }
        </div>
        </>
    )
}