import mongoose from "mongoose";
const shippingSchema = ({
    sender:{
        name:String,
        email:String,
        address:String
    },
    recipient:{
        name:String,
        email:String,
        address:String

    },
    package:{
        weight: Number,
        dimensions: String,
        description: String,
    },
    location:{
        latitude: Number,
         longitude: Number

    },
    trackingNumber: {
        type:String,
        unique:true
    },

    status: { 
        type: String, 
        enum: ["Pending", "Scheduled", "Picked Up"],
         default: "Pending" },
    createAt:{ 
        type: Date, 
        default: Date.now
    }

})


export const Shipment = new mongoose.model("Shipment",shippingSchema)