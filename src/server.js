
import express from 'express'
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import routes from '../routes/projectroutes.js'


const __dirname = path.resolve(path.dirname('')); 



const app = express()

dotenv.config()
mongoose.connect(process.env.DATABASE_ACCESS, {useNewUrlParser: true, useUnifiedTopology: true} ,() => console.log("Database Connected..."))
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json())
app.use(cors())
routes(app);
app.listen(4000, () => console.log("server is running", path.join(__dirname,'/routes') ))