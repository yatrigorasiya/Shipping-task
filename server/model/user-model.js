import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    role:{
        type:String,
        default:"admin"
    }
    
})


export const User = new mongoose.model("User",userSchema)