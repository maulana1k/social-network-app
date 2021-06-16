import React,{useState,useContext} from 'react'
import axios from 'axios'
import {UserContext} from '../../utilities/UserContext.js'

import {Form,Input,Button,Checkbox,Alert,notification} from 'antd'
import {Link,useHistory} from 'react-router-dom'

export default function SignUp(){
    const [,setUser] = useContext(UserContext)
    const [status,setStatus] = useState('success')
    const [help, setHelp] = useState(null)
    const [error,setError] = useState(false)
    const [errData, setErrData] = useState('')
    const [loading,setLoading] = useState(false)
    const url = 'https://api-socialite.herokuapp.com'
    const history = useHistory()

    const handleSubmit = values => {
        let {fullname,username,email,password} = values
        if(values.confirm_password !== values.password){
            setStatus('error');setHelp('Password doesnt match!')
        }else{
            setLoading(true)
            let data = {fullname,username,email,password}
            axios.post(`${url}/auth/register`,data,{headers:{'Content-Type':'application/json'}})
            .then( res => {
                let currentUser = res.data[0]
                setUser(currentUser)
                localStorage.setItem('socialite-user',JSON.stringify(currentUser))
                localStorage.setItem('socialite-token',JSON.stringify(res.data[1]))
                history.push('/')
                notification['success']({
                        message:`Welcome ${res.data[0].profile.fullname}`
                    })
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
        <div className="container-md flex flex-col items-center justify-center h-screen bg-white ">
            <div className="mx-auto  flex flex-col text-center space-y-1 text-gray-700 ">
                <div className="text-6xl" style={{fontFamily:'Pacifico'}} >Socialite</div>
                <div className="text-gray-500 "><b>Social Network App | Let's Connect!</b></div>
            </div>
            <div className="container text-gray-800 w-96  flex-col px-10 py-4 space-y-2 rounded-md  ">
                <div className="container justify-center flex">
                    <div className="text-xl mb-2">Join Us!</div>
                </div>
                <Form onFinish={handleSubmit} >
                    <div className="container space-y-1">
                        <div className="text-md">Fullname</div>
                     <Form.Item
                    name="fullname" 
                    rules={[
                        { required:true,message:'Please input your fullname' }
                        ]}
                    >
                        <Input style={radius} placeholder=" firstname lastname" />
                    </Form.Item>
                        <div className="text-md">Username</div>
                    <Form.Item
                    name="username" 
                    rules={[
                        { required:true,message:'Please input your username' }
                        ]}
                    >
                        <Input style={radius} placeholder="e,g firstname.lastname" />
                    </Form.Item>
                        <div className="text-md">Email</div>
                    <Form.Item
                    name="email" 
                    rules={[
                        { required:true,message:'Please input your email' }
                        ]}
                    >
                        <Input style={radius} placeholder="example@example.com" />
                    </Form.Item>
                        <div className="text-md">Password</div>
                    <Form.Item
                    name="password" 
                    rules={[
                        { required:true,message:'Please input your password' }
                        ]}
                    >
                        <Input.Password style={radius} type="password"  placeholder="*******" />
                    </Form.Item>
                        <div className="text-md">Confirm Password</div>
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
                        <Checkbox > Remember me </Checkbox>
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