
import {Avatar,
        Text,Button,
        Tab,Tabs,TabPanels,TabList,TabPanel,
        Heading    
    } from '@chakra-ui/react'
import {AlternateEmail,Send} from '@material-ui/icons'


export default function Profile(){

    return(

        <div className="container p-4 flex-col bg-white">
        <div className="text-gray-700 mb-2 text-lg"><AlternateEmail/> felicia.angelique</div>

        {/* <div className="container h-32  rounded-xl shadow-md bg-gradient-to-tr from-red-400 to-purple-500"></div> */}
        <div className="flex justify-center ">
            <div className="inline-block border-4 border-white rounded-full shadow ">
                <Avatar size="xl"  />
            </div>
        </div>
        <div className="text-gray-800 flex flex-wrap align-center justify-center p-4">
            <div className="text-xl">Felicia Angelique</div>
            <div className="text-gray-400 text-md w-4/5">im a princess Lorem ipsum dolor si.</div>
        </div>
        
        <div className="container rounded-md shadow p-2 my-2 ">
            <div className="container grid grid-cols-4 text-gray-800">
                <div className="container flex flex-col items-center justify-center">
                    <b>14</b>
                    <div className="text-gray-500 text-sm ">Photos</div>
                </div>
                <div className="container flex flex-col items-center justify-center">
                    <b>23</b>
                    <div className="text-gray-500 text-sm ">Tweets</div>
                </div>
                <div className="container flex flex-col items-center justify-center">
                    <b>3,574</b>
                    <div className="text-gray-500 text-sm ">Followers</div>
                </div>
                <div className="container flex flex-col items-center justify-center">
                    <b>924</b>
                    <div className="text-gray-500 text-sm ">Following</div>
                </div>
            </div>
        </div>
        <div className="container space-x-4 my-4">
            <Button colorScheme="blue" size="sm" >Follow</Button>

        </div>
        <Tabs isFitted >
            <TabList >
                <Tab>Photos</Tab>
                <Tab>Tweets</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <div className="container grid grid-cols-2 auto-rows-max gap-1">
                        <div className="w-36 h-36 bg-indigo-700"></div>
                        <div className="w-36 h-36 bg-indigo-700"></div>
                        <div className="w-36 h-36 bg-indigo-700"></div>
                        <div className="w-36 h-36 bg-indigo-700"></div>
                        <div className="w-36 h-36 bg-indigo-700"></div>
                        <div className="w-36 h-36 bg-indigo-700"></div>
                        
                    </div>
                </TabPanel>
                <TabPanel>Tweetss</TabPanel>
            </TabPanels>
        </Tabs>
        </div>

    )
}