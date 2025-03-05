import express from "express"
import { Login } from "../controller/user-controller.js"
const router = express.Router()

router.route("/login").post(Login)
export default router