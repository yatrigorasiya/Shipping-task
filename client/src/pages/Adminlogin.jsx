import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const handleLogin = () => {
        if (email === "admin@shipping.company" && password === "password") {
            localStorage.setItem("admin", "true");
            navigate("/admin/dashboard");
        } else {
            alert("Invalid credentials");
        }
    };
    return (
        <>
         <div className="flex justify-center items-center h-screen">
            <div className="p-6 border rounded">
                <h2 className="text-xl font-bold mb-4">Admin Login</h2>
                <input type="text" placeholder="Email" className="border p-2 w-full mb-2" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" className="border p-2 w-full mb-2" onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleLogin} className="btn btn-primary ms-1 p-2">Login</button>
            </div>
        </div>
        </>
    )

}