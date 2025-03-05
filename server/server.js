dotenv.config()
import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./utils/db.js"
import router from "./router/user-router.js"
import shippingrouter from "./router/shipping-router.js"
import cors from "cors"
const app = express()
app.use(express.json())


const corsOptions = {
    origin:"http://localhost:5173",
    method:"GET,POST,PUT,DELETE",
    Credential:true
    
}
app.use(cors(corsOptions))
const PORT = 5000
connectDb()

app.use("/api/auth",router)
app.use("/api",shippingrouter)
app.get("/",(req,res)=>{
    return res.status(200).json({message:"Api request"})
})

app.listen(PORT,()=>{
    console.log(`server is running http://localhost:${PORT}`)
})
