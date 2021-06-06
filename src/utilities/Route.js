import React, {useState,useContext} from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import {UserContext} from './UserContext.js'
//pages
import SignIn from '../pages/auth/SignIn.js'
import SignUp from '../pages/auth/SignUp.js'
import Home from '../pages/Home.js'

export default function Router(){
    const [user,setUser] = useContext(UserContext)

    const AuthRoute =({user,...props}) =>{
        if (user) {return <Route {...props} />}
            else{ 
                 //<Route {...props} /> 
            return <Redirect to='/signup' />
                 }
    }
    const SignRoute = ({user,...props}) => {
        if (!user){ return <Route {...props} /> }
            else{ return <Redirect to='/' /> }
    }
    return(<>
        <div className="md:bg-gray-100" >
        <Switch>
            <SignRoute user={user} path='/signin' >
                <SignIn/>
            </SignRoute>
            <SignRoute user={user} path='/signup' >
                <SignUp/>
            </SignRoute>
            <AuthRoute user={user} path='/' >
                <Home/>
            </AuthRoute>
        </Switch>
        </div>
        </>
    )
}