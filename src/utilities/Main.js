import react,{Suspense,lazy} from 'react'

import {Image} from 'antd'
import {BrowserRouter} from 'react-router-dom'
import {ContentProvider} from './Context.js'
import LoadingLogo from '../assets/loading_logo.png'
export default function Main(){
	const Router = lazy(()=> import('./Route.js'))


    return(
    	<ContentProvider>
            <BrowserRouter>
            <Suspense fallback={
            	<div className="h-screen flex items-center justify-center">
            		<div className="w-10 h-10 animate-pulse filter grayscale">
            		<Image src={LoadingLogo} />
            		</div>
            	</div>
            } >
                <Router/>
            </Suspense>
            </BrowserRouter>
    	</ContentProvider>
    )
}