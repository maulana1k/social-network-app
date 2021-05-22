import { Input,Button,Checkbox } from "@chakra-ui/react"
import {Link} from 'react-router-dom'

export default function SignUp(){

    return(
        <div className="container-md flex h-screen md:bg-indigo-100">
            <div className="container text-gray-800 w-96  m-auto flex-col p-10 space-y-2 rounded-md md:shadow-md bg-white">
                <div className="container justify-center flex">
                    <div className="text-2xl mb-4"><b>Sign up to our website</b></div>
                </div>
                <form action="">

                    <div>
                        <div className="text-md"><b>Username</b></div>
                        <Input 
                        name="username" 
                        variant="filled" isFullWidth="true" 
                        placeholder="e,g firstname.lastname" />
                    </div>
                    <div>
                        <div className="text-md"><b>Email</b></div>
                        <Input 
                        name="email" 
                        variant="filled" 
                        isFullWidth="true" 
                        placeholder="exapmple@example.com" />
                    </div>
                    <div>
                        <div className="text-md"><b>Password</b></div>
                        <Input 
                        name="password" 
                        type="password" 
                        variant="filled" 
                        isFullWidth="true" 
                        placeholder="*******" />
                    </div>
                    <div>
                        <div className="text-md"><b>Re-enter Password</b></div>
                        <Input 
                        name="re_password" 
                        type="password" 
                        variant="filled" 
                        isFullWidth="true" 
                        placeholder="********" />
                    </div>
                    <Checkbox name="remember" > Remember me </Checkbox>
                    <Button type="submit" colorScheme="teal" isFullWidth="true" > Signup</Button>
                    <div className="text-sm text-blue-400">
                        <Link to="/signin" > Already have an account?</Link>
                        </div>
                </form>
                    <hr/>
                    <div className="text-gray-600 flex justify-center container">Or continue with</div>
                    <div className="flex justify-center space-x-2">
                        <Button colorScheme="red" >Google</Button>
                        <Button colorScheme="facebook" >Facebook</Button>
                    </div>
            </div>
        </div>
    )
}