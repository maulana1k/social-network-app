import React, {useState,useEffect,useContext} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import {Link} from 'react-router-dom'
import {Avatar,Image} from 'antd'


import {UserContext} from '../utilities/UserContext.js'
import axios from 'axios'
import Card from '../components/CardPost.js'

import {Loading3QuartersOutlined,SyncOutlined,HeartFilled} from '@ant-design/icons'
export default function Feeds(){
    const [user] = useContext(UserContext)
    const [page,setPage] = useState(0)
    const [posts,setPosts] = useState([])
    const [more,setMore] = useState(true)
    const [suggest,setSuggest] = useState(null)
    const [spin,setSpin] = useState(false)
    const url = 'https://api-socialite.herokuapp.com'
	  console.log('posts',posts,page)

    useEffect(()=>{
    	axios.get(`${url}/posts?page=${page}&limit=4&user=${user.username}`)
      .then(res => {
        setPosts(posts.concat(res.data))
        if(res.data.length==0) setMore(false)
        console.log("data",res.data);
        console.log('posts',posts,page)
        setSpin(false)
      }).catch (err=>{
        console.log('err',err)
      })
      axios.get(`${url}/suggestion`)
      .then(res => {
        console.log('suggestion',res.data)
        setSuggest(res.data)
      }).catch(err=>{console.log(err.response)})

    },[page,spin])
    const reload = () =>{
      setPosts([])
      setSuggest(null)
      setSpin(true)
    }
    return (<>
        
        <div className="w-full md:hidden h-14 flex fixed z-10 justify-between items-center bg-white border-b px-6 ">
            <div style={{fontFamily:'Pacifico'}} className="text-gray-700 text-2xl">Socialite</div>
            <span onClick={reload} ><SyncOutlined spin={spin} style={{fontSize:'20px'}} /></span>
        </div>
        <div className="py-14 md:py-0 flex flex-col min-h-screen mb-14 p-2 space-y-6">
        {suggest && (
            <div className="w-full">
              <div className="text-gray-500 text-md mt-2 ">You may know</div>
              <div className="flex p-2 overflow-x-scroll flex-grow w-full space-x-3 ">
              { suggest.map((el,i)=>{
                if(el.username!==user.username){
                  return(<>
                  <div key={i} className="items-center flex-col px-4 overflow-x-scrollw-36 py-2 text-xs rounded-xl border flex">
                    {/*<div className="w-1/8  "><Image width={56} src={`${url}/${el.profile.avatar}`} /></div>*/}
                    <span className="mb-2" ><Avatar size={64} src={`${url}/${el.profile.avatar}`} /></span>
                      <div className="flex flex-wrap text-center"><b>{el.profile.fullname}</b></div>
                      <div className="text-gray-500">
                      <Link to={`/${el.username}`} >@{el.username}</Link>
                      </div>
                  </div>
                  </>)}
              })
            }
              </div>
            </div>
            )}
         { user.following.length!==0 ? (<>
	       { posts.length>0  ? (
	       	<InfiniteScroll
   	        dataLength={posts.length}
   	        next={()=>{
              let nextPage = page+1
              setPage(nextPage);
            }}
   	        hasMore={true}
   	        loader={
              <div className="py-4 mb-12 flex  justify-center">
              { more ? <div><Loading3QuartersOutlined style={{fontSize:'56px',color:'gray'}} spin /></div>
                : (<div className="flex flex-col space-y-2">
                  <div className="text-gray-500 text-center text-lg">It's All. want to <Link to='/explore' >explore</Link>?</div>
                    <div className="text-gray-500 text-center">Socialite app | Created with <HeartFilled/> by Maulana Imamul Khaq |  Any support means a lot to me :)</div>
                    </div>)
              }
              </div>
            }
   	        >
            <div className="space-y-4 ">
           	{ posts.map( (item,i) =>{
       	 			return <Card item={item} author={item.author} key={i} /> 
       	 		}) } 
            </div>	
   	        </InfiniteScroll> )
         : (<>
            <div className="mx-auto space-y-4 my-auto">
                <Loading3QuartersOutlined style={{fontSize:'56px',color:'gray'}} spin />
            </div>
            <div className="text-gray-500 text-center">Socialite app | Created with <HeartFilled/> by Maulana Imamul Khaq | Any support means a lot to me :)</div>
            </>)
	       }
          </>):(
          <div className="h-max ">
            <div className=" px-16 space-y-4">
              <div className="text-gray-500 text-2xl">Follow people first to see their feeds.</div>
              
            </div>
          </div>
          )
       }
       </div>
       </>
    )
}
