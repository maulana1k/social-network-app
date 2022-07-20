import express from "express";
// import multer from 'multer'
import path from "path";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8080;

//CORS
app.use(cors());
app.set((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "x-www-form-urlencoded,Content-Type,Content-Disposition, Authorization,x-access-token"
  );
  next();
});

//Mongodb connect
import mongoose from "mongoose";
const uri =
  "mongodb+srv://maulanatech:gamerindo123@cluster1.hnojf.mongodb.net/socialnetworkdb?retryWrites=true&w=majority";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connecting to database success");
  })
  .catch((err) => console.log(err));

//APP use
const __dirname = path.resolve();
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  "/public/uploads/posts",
  express.static(path.join(__dirname, "public/uploads/posts"))
);
app.use(
  "/public/uploads/avatars",
  express.static(path.join(__dirname, "public/uploads/avatars"))
);

//Main Route
import API from "./src/routes/api.js";
app.use("/", API);

//testing
app.get("/testing", (req, res, next) => {
  res.sendFile(__dirname + "/index.html");
});

// app.post('/testing/post',multer({storage:storage}).single('images'),(req,res,next)=>{
// 	try{ res.send(req.file) }catch(err){ console.log(err); res.send(400) }
// })

//Start server
app.listen(port, () => {
  console.log("Your app is running on port", port);
});
