import multer from 'multer'


const avatarStorage = multer.diskStorage({
    destination: (req,file,cb)=> {
        cb(null,'../../public/uploads')
    },
    filename: (req,file,cb)=>{
        cb(null,`av_${req.body.username}_${new Date().toTimeString()}_${file.originalname}` )
    }
})
const postStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'../../public/uploads')
    },
    filename: (req,file,cb)=>{
        cb(null,`post_${req.body.username}_${new Date().toTimeString()}_${file.originalname}`)
    }
})

export function fileFilter(req,file,cb){
    if(file.mimetype === ('image/jpg'||'image/png'||'image/jpeg'))
    {   cb(null,true)
    }else{ 
        cb(null,false) }
    
}

export {avatarStorage,postStorage}