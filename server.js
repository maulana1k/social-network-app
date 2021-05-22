import express from 'express'
import multer from 'multer'
import path from 'path'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 8080

//CORS
app.use(cors())
app.set((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods','GET, POST,PUT,PATCH,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization,x-access-token,Origin')
    next()
})

//Mongodb connect
import mongoose from 'mongoose';
const uri = "mongodb+srv://maulanatech:gamerindo123@cluster1.hnojf.mongodb.net/socialnetworkdb?retryWrites=true&w=majority";
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex:true,useFindAndModify: false})
//     .then(()=>{
//         console.log('connecting to database success');
//     }).catch(err => console.log(err))

//APP use
const __dirname = path.resolve()
app.use(express.json())
app.use('/images',express.static(path.join(__dirname,'public/uploads')))

//Main Route
import API from './src/routes/api.js'
app.use('/test',(req,res,next)=>{
     res.send('WELCOME GUYS')
     next()
})
app.use('/',API)

app.listen(port,()=>{
	console.log('Your app is running on port',port)
})
