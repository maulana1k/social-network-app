import react,{useState,useCallback} from 'react'
import Cropper from 'react-easy-crop'
import {Button,Image,Textarea} from '@chakra-ui/react'
import getCroppedImg from '../components/CropImage.js'

export default function UploadPost(props) {
	const { file,fileUrl } = props
	const [crop, setCrop] = useState({ x: 0, y: 0 })
	const [zoom, setZoom] = useState(1)
	const [isClose,setIsClose] = useState('')
	const [croppedAreaPixels,setCroppedAreaPixels] = useState(null)
	const [croppedImage, setCroppedImage] = useState(null)

	const onCropComplete = useCallback((croppedArea,croppedAreaPixels) => {
	    setCroppedAreaPixels(croppedAreaPixels)
		  },[])
	const previewImages = useCallback( async () => {
		try {
			const cropImage = await getCroppedImg(fileUrl,croppedAreaPixels) 
			setCroppedImage(cropImage)
			setIsClose('hidden')
		} catch (e) { console.log(e) }
		},[croppedAreaPixels,fileUrl])
	const onClose = useCallback(()=>{
		setCroppedImage(null)
		setIsClose('hidden')
	},[])
	return (
		
			<div className="container flex-col p-8 flex space-y-4 bg-white">
				<div className={isClose} >
				<div className="container space-x-4 flex justify-center ">
					<Cropper
					image={fileUrl}
					rotation={0}
					crop={crop}
					zoom={zoom}
					aspect={1/1}
					onCropChange={setCrop}
					onCropComplete={onCropComplete}
					onZoomChange={setZoom}
					/>
					<Button size="md" colorScheme="blue" onClick={previewImages} >Crop</Button>
					<Button size="md" colorScheme="red"  onClick={onClose} >Cancel</Button>
				</div>
				</div>
				<Image boxSize="xs" objectFit="contain" src={croppedImage} />
				<Textarea placeholder="Your caption here..." size="sm" />
				<Button size="md" colorScheme="blue" ifFullwidth >Uploads</Button>
			</div>
		)
}