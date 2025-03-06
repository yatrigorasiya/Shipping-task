import { nanoid } from "nanoid"
import { Shipment } from './../model/shipping-model.js';

import { sendShipmentUpdateEmail } from './../utils/email.js';

//shipping create:-
export const Shipping = async(req,res)=>{


    try {
        const trackingNumber = nanoid(10);
        const shipment = await Shipment.create({ ...req.body, trackingNumber });

       
        const recipientEmail = req.body.recipient?.email;
        
        if (recipientEmail) {
            try {
                await sendShipmentUpdateEmail(recipientEmail, trackingNumber, "Pending");
            } catch (emailError) {
                console.error(" Email sending failed:", emailError.message);
            }
        }

      

        return res.status(200).json({
            success: true,
            message: "Shipping created successfully!",
            shipment,
            trackingNumber
        });
    } catch (error) {
        console.error(" Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }


}

//get shipping:-
export const shippingGet = async(req,res)=>{
    try {
        const { status, sortBy, order } = req.query;
        let query = {};
        if (status) query.status = status;
        const getshipping = await Shipment.find(query).sort({ [sortBy]: order === "desc" ? -1 : 1 });
        return res.status(200).json({sucess:true,message:"get shipping succesfully",getshipping})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"internal server error"})
        
    }

}

//get shipping by tracking number:-
export const singleShippingGet = async(req,res)=>{
    try {
        const {id} = req.params
        const shipment = await Shipment.findOne({trackingNumber:id})
        if(!shipment){
            return req.status(404).json({message: "Shipment not found"})
        }
        res.status(200).json({sucess:true,message:"get single tracking number succesfully",shipment})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"internal server error"})
        
    }

}


//pickup:-
export const pickup = async(req,res)=>{
    try {
        const pickupRequest = new Shipment(req.body);
        await pickupRequest.save();
        res.status(201).json({ message: "Pickup request created successfully", pickupRequest });
        
    } catch (error) {
        res.status(500).json({ error: "Failed to create pickup request" });
        
    }

}

export const getpickup = async(req,res)=>{
    try {
        const pickupRequests = await Shipment.find();
        res.json(pickupRequests);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch pickup requests" });
    }

}
//update pickup request:-

export const putpickup = async(req,res)=>{
      try {
        const { status } = req.body;
        const updatedRequest = await Shipment.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!updatedRequest) {
            return res.status(404).json({ error: " Pickup request not found" });
        }

        // Send email notification when pickup request status is updated
        const recipientEmail = updatedRequest.recipient?.email;
        if (recipientEmail) {
            await sendShipmentUpdateEmail(recipientEmail, updatedRequest.trackingNumber, status);
        }

        res.json({
            message: " Pickup request updated successfully!",
            updatedRequest
        });

      
    } catch (error) {
        res.status(500).json({ error: "Failed to update pickup request" });
    }
    

}


// Update Shipment Status and Send Email Notification
export const updateShipmentStatus = async (req, res) => {
    try {
        const { trackingNumber, newStatus } = req.body;

       
        const shipment = await Shipment.findOne({ trackingNumber });
        if (!shipment) {
            return res.status(404).json({ message: " Shipment not found" });
        }

      
        shipment.status = newStatus;
        await shipment.save();

        // Send email notification
        const recipientEmail = shipment.recipient?.email;
        if (recipientEmail) {
            await sendShipmentUpdateEmail(recipientEmail, trackingNumber, newStatus);
        }

        res.status(200).json({
            message: " Shipment status updated successfully!",
            shipment
        });
    } catch (error) {
        console.error(" Error updating shipment status:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};