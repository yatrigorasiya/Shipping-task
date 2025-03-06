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
        

<div className="d-flex justify-content-center align-items-center mt-5">
    <div className="p-4 border rounded shadow-sm bg-white w-25">
        <h2 className="text-center mb-4">Admin Login</h2>
        <input
            type="text"
            placeholder="Email"
            className="form-control mb-3"
            onChange={(e) => setEmail(e.target.value)}
        />
        <input
            type="password"
            placeholder="Password"
            className="form-control mb-3"
            onChange={(e) => setPassword(e.target.value)}
        />
        <button
            onClick={handleLogin}
            className="btn btn-primary w-100"
        >
            Login
        </button>
    </div>
</div>
        </>
    )

}