import react from 'react'
import Router from './Route.js'
import {BrowserRouter} from 'react-router-dom'
import {ContentProvider} from './Context.js'

export default function Main(){

    return(
    	<ContentProvider>
            <BrowserRouter>
                <Router/>
            </BrowserRouter>
    	</ContentProvider>
    )
}