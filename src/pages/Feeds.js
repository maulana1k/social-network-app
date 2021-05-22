import {Heading,Avatar,Button} from '@chakra-ui/react'
import {FavoriteBorder,ThumbUpOutlined} from '@material-ui/icons'

export default function Feeds(){

    return (<>
        
        
        <div className="container flex-col p-3 space-y-6">
            <div className="container flex flex-col rounded-xl shadow bg-white ">
                <div className="container flex p-2 items-center space-x-4">
                    <Avatar size="sm" />
                    <div className="text-gray-700 text-md"> felicia </div> 
                </div>
                <div className="container w-full h-80 bg-purple-900"></div>
                <div className="container p-2">
                    <Button size="sm" ><ThumbUpOutlined/></Button>

                </div>
            </div>
            <div className="container flex flex-col rounded-md shadow bg-white ">
                <div className="container flex p-2 items-center space-x-4">
                    <Avatar size="sm" />
                    <div className="text-gray-700 text-md"> felicia </div> 
                </div>
                <div className="container w-full h-80 bg-yellow-900"></div>
                <div className="container p-2">
                    <Button size="sm" ><ThumbUpOutlined/></Button>

                </div>
            </div>
            <div className="container flex flex-col rounded-md shadow bg-white ">
                <div className="container flex p-2 items-center space-x-4">
                    <Avatar size="sm" />
                    <div className="text-gray-700 text-md"> felicia </div> 
                </div>
                <div className="container w-full h-80 bg-blue-900"></div>
                <div className="container p-2">
                    <Button size="sm" ><ThumbUpOutlined/></Button>

                </div>
            </div>
        </div>
        </>
    )
}