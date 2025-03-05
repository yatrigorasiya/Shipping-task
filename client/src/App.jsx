import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ShippingForm } from "./pages/shippingform"
import { Login } from "./pages/Adminlogin"
import { Header } from "./components/layout/Header"
import { Admin } from "./pages/admindashboard"
import { Shipmentdetails } from "./pages/Shipmentdetails"

export const App = ()=>{
  return(
    <>
  <BrowserRouter>
  <Header/>
  <Routes>
    <Route path="/" element={<ShippingForm/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/admin">
  <Route path="dashboard" element={<Admin/>}/>
  <Route path="shipment/:id" element={<Shipmentdetails/>}/>
    </Route>
  </Routes>

  </BrowserRouter>
    </>
  )
}