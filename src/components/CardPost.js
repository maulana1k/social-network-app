import react , {useState,useContext} from 'react'
import {UserContext} from '../utilities/UserContext.js'

import {Heading,Avatar,Input} from '@chakra-ui/react'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import SendRounded from '@material-ui/icons/SendRounded'
import CommentOutlined from '@material-ui/icons/CommentOutlined'
import Share from '@material-ui/icons/Share'
import Button from '@material-ui/core/Button'
import {Collapse,Comment,Typography,Image} from 'antd'

import {Link} from 'react-router-dom'


export default function Card(props){
    const [user,setUser] = useContext(UserContext)

    const {item,subject} = props
    const [ellipsis,setEllipsis] = useState(true)


    const {Paragraph} = Typography
	const {Panel} = Collapse
	return (
		 <div className="container flex flex-col rounded-md bg-white  ">
                <div className="container flex py-4 items-center space-x-4">
                    <Avatar size="sm" src={subject.profile.profile.avatar} />
                    <Link to={`/${subject.username}`}>
                    <div className="text-gray-700 text-md"><b> {subject.profile.username} </b> </div> 
                    </Link>
                </div>
                <Paragraph ellipsis={ellipsis ? {rows:2,expandable:true,symbol:"more"} : false} >
                    {item.caption}
                </Paragraph>
                <div className=" flex w-auto overflow-hidden ">
                    <Image style={{borderRadius:'8px'}}  src={item.images} />
                </div>
                <div className="container py-2">
                    <span>
                        <Button  size="small"  ><FavoriteBorder/></Button>
                        <div className="text-gray-700 inline text-sm"><b> {item.likes.length} </b></div>
                    </span>
                    
                </div>
                <Collapse bordered={false} style={{background:'white'}}  >
                    <Panel header={`${item.comments.length} Replies`} >
                    { item.comments.map( el => {
                        return (
                            <Comment
                            author={el.username}
                            content= {
                                <p className="text-gray-600">
                                {el.comment}
                                </p>    
                                }
                            />
                           
                            )
                    }) }
                        <div className="container flex items-center space-x-2">
                        <Avatar size="xs" src={user.profile.avatar} />
                        <Input variant="ghost" placeholder="Add comment..." />
                        <Button variant="ghost"> <SendRounded/> </Button>
                        </div>
                    </Panel>
                </Collapse>
            
            </div>
	)
}