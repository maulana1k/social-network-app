import React, {useState,useEffect} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import axios from 'axios'
import Card from '../components/CardPost.js'
import {Skeleton} from 'antd'

export default function Feeds(){
    const [page,setPage] = useState(0)
    const [posts,setPosts] = useState([])
    const url ='http://localhost:8080'
	  console.log('posts',posts,page)

    const getPosts = () =>{
    	axios.get(`${url}/posts?page=${page}&limit=4`)
    	.then(res => {
    		setPosts(posts.concat(res.data))
	    	console.log("data",res.data);
	    	let nextPage = page+1
	    	setPage(nextPage);
	    	console.log('posts',posts,page)
    	}).catch (err=>{
    		console.log('err',err)
    	})
	}
    useEffect(()=>{
    	axios.get(`${url}/posts?page=${page}&limit=4`)
      .then(res => {
        setPosts(posts.concat(res.data))
        console.log("data",res.data);
        // let nextPage = page+1
        // setPage(nextPage);
        console.log('posts',posts,page)
      }).catch (err=>{
        console.log('err',err)
      })
    },[page])

    return (<>
        
        <div className="container h-14 flex items-center bg-white px-4 ">
            <div className="text-gray-700 text-xl"><b>Feeds</b></div>
        </div>
        <div className="container flex-col mb-14 p-4 bg-white space-y-6">
        {/*{posts.length == 0 
        	? <Skeleton active avatar paragraph={{rows:5}} />
		    : posts.map( (item,i) =>{
	   	 			return <Card item={item} author={item.author} key={i} /> 
	   	 		}) 
	    
    	}*/}
	       {  posts.length !== 0  && (
	       	<InfiniteScroll
   	        dataLength={posts.length}
   	        next={()=>{
              let nextPage = page+1
              setPage(nextPage);
            }}
   	        hasMore={true}
   	        loader={
              <div className="p-4">
              <Skeleton active avatar paragraph={{rows:3}} />
              </div>
            }
   	        >
            <div className="space-y-4">
           	{ posts.map( (item,i) =>{
       	 			return <Card item={item} author={item.author} key={i} /> 
       	 		}) } 
            </div>	
   	        </InfiniteScroll> )
	       }
       </div>
       </>
    )
}