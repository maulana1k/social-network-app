import react,{useEffect} from 'react'

const Geolocation = callback =>{
	
		const script = document.createElement('script')
		script.type= 'text/javascript'
		script.src = 'http://maps.googleapis.com/maps/api/js?key=AIzaSyAFlEUDMz2tBW-45l2VzVCe91Y6N3r2Su0'
		script.id = 'googlemaps'
		script.async = true
		document.body.appendChild(script)
		script.onload = () =>{
			if (callback){
				callback()
				console.log('geo success')
			}else{ console.log('geo error') } 
		}

	
}

export default Geolocation