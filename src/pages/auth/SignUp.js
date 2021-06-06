import React,{useState,useContext} from 'react'
import axios from 'axios'
import {UserContext} from '../../utilities/UserContext.js'

import {Form,Input,Button,Checkbox,Alert} from 'antd'
import {Link,useHistory} from 'react-router-dom'

export default function SignUp(){
    const [,setUser] = useContext(UserContext)
    const [status,setStatus] = useState('success')
    const [help, setHelp] = useState(null)
    const [error,setError] = useState(false)
    const [errData, setErrData] = useState('')
    const url = 'http://localhost:8080'
    const history = useHistory()

    const handleSubmit = values => {
        let {fullname,username,email,password} = values
        if(values.confirm_password !== values.password){
            setStatus('error');setHelp('Password doesnt match!')
        }else{
            let data = {fullname,username,email,password}
            axios.post(`${url}/auth/register`,data,{headers:{'Content-Type':'application/json'}})
            .then( res => {
                let currentUser = res.data
                setUser(currentUser)
                if(values.remember===true) localStorage.setItem('user',JSON.stringify(currentUser))
                history.push('/')
            }).catch( err =>{
                if(err.response){
                    console.log(err.response)
                    setErrData(err.response.data)
                }
                 setError(true);
            })
        }
    }
    const radius = {borderRadius:'6px'} 
    return(
        <div className="container-md flex h-screen md:bg-indigo-100">
            <div className="container text-gray-800 w-96  m-auto flex-col p-10 space-y-2 rounded-md md:shadow-md bg-white">
                <div className="container justify-center flex">
                    <div className="text-2xl mb-4"><b>Join Us!</b></div>
                </div>
                <Form onFinish={handleSubmit} >
                    <div className="container space-y-1">
                        <div className="text-md"><b>Fullname</b></div>
                     <Form.Item
                    name="fullname" 
                    rules={[
                        { required:true,message:'Please input your fullname' }
                        ]}
                    >
                        <Input style={radius} placeholder=" firstname lastname" />
                    </Form.Item>
                        <div className="text-md"><b>Username</b></div>
                    <Form.Item
                    name="username" 
                    rules={[
                        { required:true,message:'Please input your username' }
                        ]}
                    >
                        <Input style={radius} placeholder="e,g firstname.lastname" />
                    </Form.Item>
                        <div className="text-md"><b>Email</b></div>
                    <Form.Item
                    name="email" 
                    rules={[
                        { required:true,message:'Please input your email' }
                        ]}
                    >
                        <Input style={radius} placeholder="example@example.com" />
                    </Form.Item>
                        <div className="text-md"><b>Password</b></div>
                    <Form.Item
                    name="password" 
                    rules={[
                        { required:true,message:'Please input your password' }
                        ]}
                    >
                        <Input.Password style={radius} type="password"  placeholder="*******" />
                    </Form.Item>
                        <div className="text-md"><b>Confirm Password</b></div>
                    <Form.Item
                    name="confirm_password" 
                    validateStatus={status}
                    help={help}
                    rules={[
                        { required:true,message:'Please confirm password' }
                        ]}
                    >
                        <Input.Password style={radius} type="password"  placeholder="*******" />
                    </Form.Item>
                    <Form.Item name="remember" >
                        <Checkbox checked> Remember me </Checkbox>
                    </Form.Item>
                        <Button style={radius} htmlType="submit" type="primary" block > Signup</Button>
                        <div className="text-sm text-blue-400">
                            <Link to="/signin" > Already have an account? Sign in</Link>
                            </div>
                    </div>
                    { error && <Alert type="error" message="Error" description={errData} showIcon closable /> }
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