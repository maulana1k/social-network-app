import {Route,Switch,Redirect} from 'react-router-dom'

//pages
import SignIn from '../pages/auth/SignIn.js'
import SignUp from '../pages/auth/SignUp.js'
import Home from '../pages/Home.js'

export default function Router(){

    return(<>
        <div className="md:bg-gray-100" >
        <Switch>
            <Route path='/signin' >
                <SignIn/>
            </Route>
            <Route path='/signup' >
                <SignUp/>
            </Route>
            <Route path='/' >
                <Home/>

            </Route>
        </Switch>
        </div>
        </>
    )
}