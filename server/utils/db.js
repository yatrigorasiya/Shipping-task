import mongoose from "mongoose";

export const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.URI)
        console.log("connection succesfully")
        
    } catch (error) {
        console.log("connection fail")
        
    }

}