import react from 'react'
import Router from './Route.js'
import {BrowserRouter} from 'react-router-dom'

export default function Main(){

    return(
            <BrowserRouter>
                <Router/>
            </BrowserRouter>
    )
}