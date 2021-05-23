import {InputGroup,InputLeftElement,Input,Avatar} from '@chakra-ui/react'
import {SearchRounded} from '@material-ui/icons'

export default function Search(){
    return (<>
        <div className="container flex bg-white px-10 py-8  justify-center items-center">
            <InputGroup size="md">
                <InputLeftElement 
                    pointerEvents="none"
                    children={<SearchRounded color="disabled"/>}
                />
                <Input variant="filled" name="search" placeholder="Search people" />
            </InputGroup>
            
        </div>
        <div className="container px-4 space-y-6  items-center bg-white ">
            <div className="container flex items-center space-x-4 text-gray-600 bg-white flex">
               <Avatar size="md" />
               <div className="container">
                   <b> Miskahuddin </b>
                   <div className="text-gray-400 text-sm">@miskah__</div>
               </div>
            </div>
            <div className="container flex items-center space-x-4 text-gray-600 bg-white flex">
               <Avatar size="md" />
               <div className="container">
                   <b> Miskahuddin </b>
                   <div className="text-gray-400 text-sm">@miskah__</div>
               </div>
            </div>
            <div className="container flex items-center space-x-4 text-gray-600 bg-white flex">
               <Avatar size="md" />
               <div className="container">
                   <b> Miskahuddin </b>
                   <div className="text-gray-400 text-sm">@miskah__</div>
               </div>
            </div>
        </div>
        </>
    )
}