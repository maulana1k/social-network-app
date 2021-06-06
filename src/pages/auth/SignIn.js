import React,{useState,useContext} from 'react'
import {UserContext} from '../../utilities/UserContext.js'
import axios from 'axios'

import {Form,Input,Button,Checkbox,Alert} from 'antd'
import {Link,useHistory} from 'react-router-dom'

export default function SignIn(){
    const [,setUser] = useContext(UserContext)
    const [error,setError] = useState(false)
    const [errData, setErrData] = useState('')

    const url =  'http://localhost:8080'
    const history = useHistory()
    const handleSubmit = values => {
        let {username,password} = values
        axios.post(`${url}/auth/login`,{username,password},{headers:{'Content-Type':'application/json'}})
        .then( res=>{ 
            let currentUser = res.data
            console.log(res.data)
            setUser(currentUser)
            localStorage.setItem('user',JSON.stringify(currentUser))
            history.push('/')
        }).catch(err=>{
            if(err.response){
                console.log(err.response)
                setErrData(err.response.data)
            }
             setError(true);
        })
    }
    const radius = {borderRadius:'6px'} 
    return(

        <div className="container-md flex h-screen md:bg-gray-100">
            <div className="container text-gray-700 w-96  m-auto flex-col p-10 space-y-4 rounded-md md:shadow-md bg-white">
                    <div className="container justify-center flex">
                        <div className="text-2xl mb-4"><b>Sign in to your account</b></div>
                    </div>
                    <Form onFinish={handleSubmit} >
                        <div className="container space-y-1">
                            <div className="text-md"><b>Username</b></div>
                            <Form.Item
                            name="username" 
                            rules={[
                                { required:true,message:'Please input your username' }
                                ]}
                            >
                                <Input style={radius} placeholder="e,g firstname.lastname" />
                            </Form.Item>   
                                <div className="text-md"><b>Password</b></div>
                            <Form.Item
                            name="password" 
                            rules={[
                                { required:true,message:'Please input your username' }
                                ]}
                            >
                                <Input.Password style={radius} type="password"  placeholder="*******" />
                            </Form.Item>  
                            <Form.Item name="remember" >
                                <Checkbox checked> Remember me </Checkbox>
                            </Form.Item>
                                <Button style={radius} htmlType="submit" type="primary" block > Signup</Button>
                                <div className="text-sm text-blue-400">
                                    <Link to="/signup" > Dont have an account? Sign up</Link>
                                    </div>
                            </div>
                            { error && <Alert type="error" message="Error" description={errData} showIcon closable/> }
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