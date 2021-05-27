import React,{useState,useContext} from 'react'
import axios from 'axios'
import {UserContext} from '../../utilities/UserContext.js'

import { Input,Button,Checkbox,FormControl,FormErrorMessage } from "@chakra-ui/react"
import {Link,useHistory} from 'react-router-dom'

export default function SignUp(){
    const [,setUser] = useContext(UserContext)
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [re_password,setRe_password] = useState('')
    const [invalid,setInvalid] = useState(false)
    const [error,setError] = useState('')
    const [passErr,setPassErr] = useState('')
    const [passInv,setPassInv] = useState(false)
    const [remember,setRemember] = useState(false)

    const url = 'http://localhost:8080'
    const history = useHistory()
    console.log(username,email,password)
    const handleSubmit = e =>{
        e.preventDefault()
        if(password != re_password) {
            setPassInv(true)
            setPassErr('Password doesnt match!')
        }else{
            let data = {username,email,password}
            axios.post(`${url}/auth/register`,data,{
                headers:{'Content-Type':'application/json'}
            }).then( res =>{
                let currentUser = res.data
                setUser(currentUser)
                if (remember) localStorage.setItem('user',JSON.stringify(currentUser))
                history.push('/')
            }).catch( err => {
                setInvalid(true)
                setError(err.response.data)
                console.log('error',err.response.data)
            })
        }
    }
    return(
        <div className="container-md flex h-screen md:bg-indigo-100">
            <div className="container text-gray-800 w-96  m-auto flex-col p-10 space-y-2 rounded-md md:shadow-md bg-white">
                <div className="container justify-center flex">
                    <div className="text-2xl mb-4"><b>Join Us!</b></div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="container space-y-2">
                        <FormControl isRequired isInvalid={invalid} >
                            <div className="text-md"><b>Username</b></div>
                            <Input 
                            name="username" 
                            variant="filled" 
                            isFullWidth onChange= {e=> setUsername(e.currentTarget.value)}
                            placeholder="e,g firstname.lastname" />
                        <FormErrorMessage>{error}</FormErrorMessage>       
                        </FormControl >
                        <FormControl isRequired isInvalid={invalid}>
                            <div className="text-md"><b>Email</b></div>
                            <Input 
                            name="email" 
                            variant="filled" 
                            isFullWidth onChange={e=>setEmail(e.currentTarget.value)}
                            placeholder="example@example.com" />
                        <FormErrorMessage>{error}</FormErrorMessage>       
                        </FormControl>
                        <FormControl isRequired >
                            <div className="text-md"><b>Password</b></div>
                            <Input 
                            name="password" 
                            type="password" 
                            variant="filled" 
                            isFullWidth onChange={e=>setPassword(e.currentTarget.value)}
                            placeholder="*******" />
                               
                        </FormControl>
                        <FormControl isRequired isInvalid={passInv}>
                            <div className="text-md"><b>Re-enter Password</b></div>
                            <Input 
                            name="re_password" 
                            type="password" 
                            variant="filled" 
                            isFullWidth onChange={e=>setRe_password(e.currentTarget.value)}
                            placeholder="********" />
                        <FormErrorMessage>{passErr}</FormErrorMessage>       
                        </FormControl>
                        <Checkbox name="remember" onChange={e=> setRemember(e.currentTarget.value)} > Remember me </Checkbox>
                        <Button type="submit" colorScheme="blue" isFullWidth="true" > Signup</Button>
                        <div className="text-sm text-blue-400">
                            <Link to="/signin" > Already have an account? Sign in</Link>
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