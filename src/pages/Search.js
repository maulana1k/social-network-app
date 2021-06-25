import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'

import {Content} from '../utilities/Context.js'
import CardPost from '../components/CardPost.js'
import {Input,Avatar,Image,Divider,Button,Tabs} from 'antd'
import {SearchOutlined,Loading3QuartersOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'
const {TabPane} = Tabs

export default function Search(){
    const {exploreState,exPageState} = useContext(Content)
    const [query,setQuery] = useState(null)
    const [result,setResult] = useState(null)
    const [explore,setExplore] = exploreState
    const [explorePage,setExplorePage] = exPageState
    
    const url = 'https://api-socialite.herokuapp.com'

    console.log('page',explorePage)
    const getExplore = () =>{ 
      axios.get(`${url}/posts?page=${explorePage}&limit=9`)
      .then(res => {
        setExplore(explore.concat(res.data))
        console.log("data",res.data);
        if(res.data.length>0) setExplorePage(explorePage+1)
      }).catch (err=>{
        console.log('err',err)
      })
    }
    useEffect(()=>{
      if(explore.length===0){
        axios.get(`${url}/posts?page=0&limit=9`)
        .then(res => {
          setExplore(explore.concat(res.data))
          console.log("data",res.data);
          setExplorePage(explorePage+1)
        }).catch (err=>{
          console.log('err',err)
        })
      }
    },[])

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
        <div className="md:hidden flex w-8/12 bg-white rounded-md mt-4  mx-auto justify-center items-center">
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
          
          { !result && !query && explore.length>0 && (
              <div className="container mb-14">
                  <Tabs centered defaultActiveKey='1' >
                    <TabPane tab={<div className="text-lg">Photos</div>} key='1' >
                    <div className="container grid grid-cols-3  ">
                    { explore.map( (item,i) =>{
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
                    </TabPane>
                    <TabPane tab={<div className="text-lg">Tweets</div>} key='2' >
                      <div className="container space-y-2  p-2">
                      { explore.map((item,i)=>{
                        if(!item.images){
                          return(<>
                            <CardPost item={item} author={item.author} key={i} /><hr/>
                            </>)
                        }
                      }) }
                      </div>
                    </TabPane>
                  </Tabs>
                      <div className="my-4 flex justify-center">
                        <Button type="ouline" onClick={getExplore} >view more</Button>  
                      </div>
                  </div>  
            ) }
          { explore.length===0 && (
              <div className="py-4 my-auto flex h-full items-center container justify-center">
                <div><Loading3QuartersOutlined style={{fontSize:'40px',color:'gray'}} spin /></div>              
                </div>
            ) }
        </div>
        </>
    )
}