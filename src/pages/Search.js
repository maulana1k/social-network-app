import React,{useState,useEffect} from 'react'
import axios from 'axios'

import {Input,Avatar} from 'antd'
import {SearchOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'

export default function Search(){
    const [query,setQuery] = useState(null)
    const [result,setResult] = useState(null) 

    const url = 'http://localhost:8080'

    useEffect(()=>{
      if(query){
        axios.get(`${url}/search?username=${query}`)
        .then( res => {
          setResult(res.data)
        }).catch( err => { console.log(err) } )
      }
      if(!query) setResult(null)
    },[query])

    const handleChange = (e) => {
      setQuery(e.currentTarget.value)  
    }

    return (<>
        <div className="container flex bg-white px-10 py-8  justify-center items-center">
            <Input style={{borderRadius:'6px'}} allowClear onChange={handleChange} name="search"
            size="large"  placeholder="lets find people..." prefix={ <SearchOutlined/> } />
        </div>
        <div className="container px-4 space-y-6  items-center bg-white ">
          { result &&  result.map(el => {
            return (
                <Link to={`/p/${el.username}`} >  
                <div className="container flex p-4 items-center hover:bg-blue-50 focus:bg-blue-50 space-x-2 text-gray-600 bg-white flex">
                   <div><Avatar  src={el.profile.avatar} /></div>
                   <div className="container">
                       <b> {el.profile.fullname} </b>
                       <div className="text-gray-400 text-sm">@{el.username}</div>
                   </div>
                </div>
                </Link>

              )
          }) }
          { query && result && result.length === 0 && <div className="text-gray-400">Oops! can't found "{ query }" </div> }
          { !result && !query && (
            <div className="my-auto mx-auto flex justify-center">
              <div className="text-gray-600 text-lg"><b>Find People?</b></div>
            </div>
            ) }
        </div>
        </>
    )
}