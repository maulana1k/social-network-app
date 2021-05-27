import React,{useState,useContext} from 'react'
import {UserContext} from '../../utilities/UserContext.js'
import axios from 'axios'

import {Input,Checkbox,Button,FormControl,FormErrorMessage} from "@chakra-ui/react"
import {Link,useHistory} from 'react-router-dom'

export default function SignIn(){
    const [,setUser] = useContext(UserContext)
    const [invalid,setInvalid] = useState(false)
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')
    const [remember,setRemember] = useState(false)

    const url =  'http://localhost:8080'
    const history = useHistory()
    console.log(username,password)
    const handleSubmit = event => {
        event.preventDefault()
        let data = {username,password}
        axios.post(`${url}/auth/login`,data,{
            headers:{'Content-Type':'application/json'}
        }).then( res => {
            let currentUser = res.data
            setUser(currentUser)
            if (remember) localStorage.setItem('user',JSON.stringify(currentUser))
            history.push('/')
        }).catch( err =>{
            setInvalid(true)
            setError(err.response.data)
            console.log('error',err.response.data)
        })
    }
    return(

        <div className="container-md flex h-screen md:bg-gray-100">
            <div className="container text-gray-700 w-96  m-auto flex-col p-10 space-y-4 rounded-md md:shadow-md bg-white">
                    <div className="container justify-center flex">
                        <div className="text-2xl mb-4"><b>Sign in to your account</b></div>
                    </div>
                    <form onSubmit={handleSubmit} >
                        <div className="container space-y-2">
                        
                            <FormControl isRequired isInvalid={invalid}>
                                <div className="text-md"><b>Username</b></div>
                                <Input 
                                name="username" 
                                variant="filled" 
                                isFullWidth onChange= {e=> setUsername(e.currentTarget.value)}
                                placeholder="e,g firstname.lastname" />
                            <FormErrorMessage>{error}</FormErrorMessage>
                            </FormControl>
                            
                            <FormControl isRequired isInvalid={invalid}>
                                <div className="text-md"><b>Password</b></div>
                                <Input 
                                name="password" 
                                type="password" 
                                variant="filled" 
                                isFullWidth onChange= {e=> setPassword(e.currentTarget.value)}
                                placeholder="*******" />
                            <FormErrorMessage>{error}</FormErrorMessage>
                            </FormControl>
                            <Checkbox name="remember" onChange={e=> setRemember(e.currentTarget.value)} > Remember me </Checkbox>
                            <Button type="submit" colorScheme="blue" isFullWidth >Signin</Button>
                            <div className="text-sm text-blue-400">
                                <Link to="/signup" > Don't have an account? Register</Link>
                            </div>
                        </div>
                    </form>
                        {/*<hr/>
                        <div className="text-gray-600 flex justify-center container">Or continue with</div>
                        <div className="flex justify-center space-x-2">
                            <Button colorScheme="red" >Google</Button>
                            <Button colorScheme="facebook" >Facebook</Button>
                        </div>*/}
            </div>
        </div>
    )
}