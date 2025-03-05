import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const Shipmentdetails = ()=>{
    const[shipment,setShipment] = useState([])
    const {id} = useParams()


    const getShipment = async(req,res)=>{
        const {data} = await axios.get(`http://localhost:5000/api/getshipping/${id}`)
        console.log(data.shipment)
        setShipment(data.shipment)

    }
    useEffect(()=>{
        getShipment()

    },[id])
    if (!shipment) return <p>Loading...</p>;
    return(
        <>
         <div className="p-4">
         <h1 className="text-2xl font-bold mb-4">Shipment Details</h1>
         <p><strong>Tracking Number:</strong> {shipment.trackingNumber}</p>
     <p><strong>Status:</strong> {shipment.status}</p>
     <p><strong>Sender:</strong> ({shipment.sender?.email}) ({shipment.sender?.address})</p> 
     <p><strong>Recipient:</strong>  ({shipment.recipient?.email}) ({shipment.recipient?.address})</p> 
       <p><strong>Package:</strong> {shipment.package?.weight} kg - {shipment.package?.dimensions} ({shipment.package?.description})</p> 
      
         </div>
        </>
    )
}