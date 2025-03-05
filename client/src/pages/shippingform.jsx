




import axios from "axios";
import { useState } from "react";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { toast } from "react-toastify";

const libraries = ["places"];

export const ShippingForm = () => {

   

    const [form, setForm] = useState({
        sender: { name: "", email: "", address: "" },
        recipient: { name: "", email: "", address: "" },
        package: { weight: 0, dimensions: "", description: "" },
        location: { latitude: "", longitude: "" }
    });

    const [trackingNumber, setTrackingNumber] = useState("");
   
    const [mapCenter, setMapCenter] = useState({ lat: 37.7749, lng: -122.4194 }); // Default SF location
    const [markerPosition, setMarkerPosition] = useState(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, 
        libraries,
    });

    //  Capture Location Using Browser's Geolocation API
    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setForm((prevForm) => ({
                        ...prevForm,
                        location: { latitude, longitude }
                    }));
                    setMapCenter({ lat: latitude, lng: longitude });
                    setMarkerPosition({ lat: latitude, lng: longitude });
                },
                (error) => alert("Geolocation error: " + error.message)
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    };

    const handleLocationChange = (e, field) => {
        const value = e.target.value;
        setForm((prevForm) => {
            const updatedLocation = { ...prevForm.location, [field]: value };
            return { ...prevForm, location: updatedLocation };
        });
    };

    const updateMapLocation = () => {
        const { latitude, longitude } = form.location;
        const lat = parseFloat(latitude);
        const lng = parseFloat(longitude);
        if (!isNaN(lat) && !isNaN(lng)) {
            setMapCenter({ lat, lng });
            setMarkerPosition({ lat, lng });
        } else {
            alert("Please enter valid latitude and longitude values.");
        }
    };

   //submit from:-
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/shipping", form);
            setTrackingNumber(response.data.trackingNumber);
            toast.success(`Your trackingnumber is:${response.data.trackingNumber}`)
            toast.success("mail send succesfully")
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Failed to submit. Check console for details.");
        }
    };

    const handleChange = (e, section, field) => {
        setForm(prev => ({
            ...prev,
            [section]: { ...prev[section], [field]: e.target.value }
        }));
    };
    
   
    if (loadError) return <p>Error loading maps</p>;

    return (
   
        <div className="container mt-4">
            <h2 className="text-center text-primary">Create Shipping Request</h2>
           <form onSubmit={handleSubmit} className="row g-3"> 

           {[
                    { section: "sender", fields: ["name", "email", "address"] },
                    { section: "recipient", fields: ["name", "email", "address"] },
                    { section: "package", fields: ["weight", "dimensions", "description"] },
                  
                ].map(({ section, fields }) =>
                    fields.map(field => (
                        <div className="col-md-4" key={`${section}-${field}`}>
                            <input
                                className="form-control"
                                type="text"
                                placeholder={`${section.charAt(0).toUpperCase() + section.slice(1)} ${field}`}
                                value={form[section][field]}
                                onChange={(e) => handleChange(e, section, field)}
                            />
                        </div>
                    ))
                )}
       
                
                
               
                 
               <div className="col-md-6">
               <input className="form-control" type="text" placeholder="Latitude"  value={form.location.latitude} onChange={(e) => handleLocationChange(e, "latitude")} />
               </div>

              <div className="col-md-6">
              <input className="form-control" type="text" placeholder="Longitude"  value={form.location.longitude} onChange={(e) => handleLocationChange(e, "longitude")} />
              </div>
                
                

                <div className="col-12 text-center mb-4">
                <button type="button" onClick={updateMapLocation} className="btn btn-success me-2">Update Map</button>
                <button type="submit" className="btn btn-primary me-2">Submit</button>

              
               
                <button type="button" onClick={handleGetLocation} className="btn btn-warning">
                    Capture Current Location
                </button>

                </div>
               
            </form>
            {trackingNumber && <p>Your tracking number: {trackingNumber}</p>}
             
              {isLoaded && (
                    <GoogleMap zoom={15} center={mapCenter} mapContainerStyle={{ width: "100%", height: "300px" }}>
                        {markerPosition && <Marker position={markerPosition} />}
                    </GoogleMap>
                )}


           
        </div>
    );
};
