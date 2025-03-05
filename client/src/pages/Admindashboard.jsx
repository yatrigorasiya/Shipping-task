import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export const Admin = ()=>{
    const [shipment,setShipment] = useState([])
    const [sortBy, setSortBy] = useState("createdAt");
    const [order, setOrder] = useState("desc");

    const getShipment = async()=>{
        const {data} = await axios.get(`http://localhost:5000/api/getshipping?status=${status}&sortBy=${sortBy}&order=${order}`)
        console.log(data.getshipping)
        setShipment(data.getshipping)
    }
    useEffect(()=>{
        getShipment()
    },[status, sortBy, order])


   
    const updateShipmentStatus = async (id, newStatus) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/updatepickup/${id}`, { status: newStatus });
    
            if (response.status === 200) {
                console.log("Status updated successfully");
                getShipment(); 
            }
        } catch (error) {
            console.error("Error updating shipment status:", error);
        }
    };
    return (
        <>
        <div className="mt-3">
            <h2>Admin Dashboard</h2>

            <div className="mb-4 flex space-x-4">
       
       
        {/* filter */}
        <select className="border p-2 me-2" onChange={e => setSortBy(e.target.value)}>
          <option value="createdAt">Date</option>
          <option value="trackingNumber">Tracking Number</option>
        </select>
          
         {/* sorting   */}
        <select className="border p-2" onChange={e => setOrder(e.target.value)}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
        </div>
            <table className="border w-full">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Tracking No.</th>
                        <th className="border px-4 py-2">sender name</th>
                        <th className="border px-4 py-2">sender email</th>
                        <th className="border px-4 py-2">sender address</th>
                        <th className="border px-4 py-2">reciver name</th>
                        <th className="border px-4 py-2">reciver email</th>
                        <th className="border px-4 py-2">reciver address</th>
                        <th className="border px-4 py-2">Tracking No.</th>
                        <th className="border px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {shipment.map((shipment) => (
                        <tr key={shipment.trackingNumber}>
                            <td className="border px-4 py-2">{shipment.trackingNumber}</td>
                            <td className="border px-4 py-2">{shipment.sender.name}</td>
                            <td className="border px-4 py-2">{shipment.sender.email}</td>
                            <td className="border px-4 py-2">{shipment.sender.address}</td>
                            <td className="border px-4 py-2">{shipment.recipient.name}</td>
                            <td className="border px-4 py-2">{shipment.recipient.email}</td>
                            <td className="border px-4 py-2">{shipment.recipient.address}</td>
                            <td className="border px-4 py-2">{shipment.status}</td>

                          
{/* pickup data */}
<td className="border px-4 py-2">
    <select
        value={shipment.status}
        onChange={(e) => updateShipmentStatus(shipment._id, e.target.value)}
        className="border p-1"
    >
        <option value="Pending">Pending</option>
        <option value="In Transit">In Transit</option>
        <option value="Delivered">Delivered</option>
    </select>
</td>
                            <Link to={`/admin/shipment/${shipment.trackingNumber}`} className="link">View Details</Link>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        </>
    )
}