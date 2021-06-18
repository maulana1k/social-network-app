import React,{useState,useContext} from 'react'
import {UserContext} from '../../utilities/UserContext.js'
import axios from 'axios'

import {Form,Input,Button,Checkbox,Alert,notification} from 'antd'
import {Link,useHistory} from 'react-router-dom'

export default function SignIn(){
    const [,setUser,setToken] = useContext(UserContext)
    const [error,setError] = useState(false)
    const [errData, setErrData] = useState('')
    const [loading,setLoading] = useState(false)

    // const url =  'http://localhost:7000'
    const url = 'https://api-socialite.herokuapp.com'
    const history = useHistory()
    const handleSubmit = values => {
        let {username,password} = values
        let data = {username:username.toLowerCase(),password}
        setLoading(true)
        axios.post(`${url}/auth/login`,data,{headers:{'Content-Type':'application/json'}})
        .then( res=>{ 
            let currentUser = res.data[0]
            setUser(currentUser)
            setToken(res.data[1])
            localStorage.setItem('socialite-user',JSON.stringify(res.data[0]))
            localStorage.setItem('socialite-token',JSON.stringify(res.data[1]))
            console.log('res login',res.data)
            history.push('/')
            notification['success']({
                    message:`Welcome ${res.data[0].profile.fullname}`
                })
        }).catch(err=>{
            if(err.response){
                console.log(err.response)
                setErrData(err.response.data)
            }
            setLoading(false)
            setError(true);
        })
    }
    const radius = {borderRadius:'6px'} 
    return(

        <div className="container-md flex h-screen flex-col items-center justify-center bg-white ">
             <div className="mx-auto  flex flex-col text-center space-y-1 text-gray-700 ">
                <div className="text-6xl" style={{fontFamily:'Pacifico'}} >Socialite</div>
                <div className="text-gray-500 "><b>Social Network App | Let's Connect!</b></div>
            </div>
            <div className="container text-gray-700 w-96  flex-col p-10 space-y-4 rounded-md ">
                    <div className="container justify-center flex">
                        <div className="text-xl mb-2">Sign in to your account</div>
                    </div>
                    <Form onFinish={handleSubmit} >
                        <div className="container space-y-1">
                            <div className="text-md">Username</div>
                            <Form.Item
                            name="username" 
                            rules={[
                                { required:true,message:'Please input your username' }
                                ]}
                            >
                                <Input style={radius} placeholder="e,g firstname.lastname" />
                            </Form.Item>   
                                <div className="text-md">Password</div>
                            <Form.Item
                            name="password" 
                            rules={[
                                { required:true,message:'Please input your username' }
                                ]}
                            >
                                <Input.Password style={radius} type="password"  placeholder="*******" />
                            </Form.Item>  
                            <Form.Item name="remember" >
                                <Checkbox > Remember me </Checkbox>
                            </Form.Item>
                                <Button style={radius} loading={loading} htmlType="submit" type="primary" block > Signin</Button>
                                <div className="text-sm text-blue-400">
                                    <Link to="/signup" > Dont have an account? Sign up</Link>
                                    </div>
                            </div>
                            { error && <Alert type="error" message="Error" description={errData} showIcon /> }
                        </Form>
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