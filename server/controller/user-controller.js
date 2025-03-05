import jwt from "jsonwebtoken"

export const Login = async(req,res)=>{

    const ADMIN_EMAIL = "admin@shipping.company"
    const ADMIN_PASSWORD = "password" 
    try {
        const {email,password} = req.body
        if(email === ADMIN_EMAIL && password === ADMIN_PASSWORD){
            const token = jwt.sign({
                email,
                role:"admin"
            },
       process.env.SECRET_KEY,
       {
        expiresIn:"30d"
       }
        )
   

        return res.json({sucess:true,message:"token create succesfully",token})

        }
        res.status(401).json({ message: "Invalid credentials" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"internal server error"})
        
    }

}