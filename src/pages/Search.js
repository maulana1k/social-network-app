import {InputGroup,InputLeftElement,Input} from '@chakra-ui/react'
import {SearchRounded} from '@material-ui/icons'

export default function Search(){
    return (
        <div className="container flex bg-white px-10 py-8  justify-center items-center">
            <InputGroup size="md">
                <InputLeftElement 
                    pointerEvents="none"
                    children={<SearchRounded color="disabled"/>}
                />
                <Input variant="filled" name="search" placeholder="Search people" />
            </InputGroup>
        </div>
    )
}