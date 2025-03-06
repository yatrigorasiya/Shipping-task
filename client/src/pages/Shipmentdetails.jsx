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
         <div className="container p-4 border w-25 mt-2 shadow-lg">
         <h1 className="h3 fw-bold mb-4">Shipment Details</h1>
    <p><strong>Tracking Number:</strong> {shipment.trackingNumber}</p>
     <p><strong>Status:</strong> {shipment.status}</p>

     <p><strong>Sender:</strong>
     Name:{shipment.sender?.name}  <br/>
     Email: {shipment.sender?.email} <br/>
     Address:{shipment.sender?.address}<br/>
     </p> 

     <p><strong>Recipient:</strong>
      Name:{shipment.recipient?.name}<br/>
      Email: {shipment.recipient?.email}<br/>
      Address:{shipment.recipient?.address}<br/>
       </p> 

       <p><strong>Package:</strong> 
      Weight: {shipment.package?.weight}  kg - <br/>
      Dimensions:{shipment.package?.dimensions} <br/>
      Desctiprion: {shipment.package?.description}<br/>
       </p> 
      
         </div>
        </>
    )
}