import multer from 'multer'


const avatarStorage = multer.diskStorage({
    destination: (req,file,cb)=> {
        cb(null,'./public/uploads/avatars')
    },
    filename: (req,file,cb)=>{
        let d = new Date()
        let date = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
        cb(null,`av_${req.params.username}_${date}_${file.originalname}` )
    }
})
const postStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./public/uploads/posts')
    },
    filename: (req,file,cb)=>{
        let d = new Date()
        let date = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
        cb(null,`post_${req.params.username}_${date}_${file.originalname}`)
    }
})

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/jpg'||
       file.mimetype === 'image/png'||
       file.mimetype === 'image/jpeg')
    {   cb(null,true)
    }else{ 
        cb(null,false) }
    
}

export {avatarStorage,postStorage,fileFilter}