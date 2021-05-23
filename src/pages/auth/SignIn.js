import {Input,Checkbox,Button} from "@chakra-ui/react"
import {Link} from 'react-router-dom'

export default function SignIn(){

    return(

        <div className="container-md flex h-screen md:bg-indigo-100">
            <div className="container text-gray-700 w-96  m-auto flex-col p-10 space-y-4 rounded-md md:shadow-md bg-white">
                    <div className="container justify-center flex">
                        <div className="text-2xl mb-4"><b>Sign in to your account</b></div>
                    </div>
                    <form action="">
                        <div className="container space-y-2">
                            <div>
                                <div className="text-md"><b>Username</b></div>
                                <Input 
                                name="username" 
                                variant="filled" 
                                isFullWidth 
                                placeholder="e,g firstname.lastname" />
                            </div>
                            <div>
                                <div className="text-md"><b>Password</b></div>
                                <Input 
                                name="password" 
                                type="password" 
                                variant="filled" 
                                isFullWidth 
                                placeholder="*******" />
                            </div>
                            <Checkbox name="remember" > Remember me </Checkbox>
                            <Button type="submit" colorScheme="blue" isFullWidth="true" > Signin</Button>
                            <div className="text-sm text-blue-400">
                                <Link to="/signup" > Don't have an account?</Link>
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