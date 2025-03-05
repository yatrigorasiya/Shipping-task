import express from "express"
import { getpickup, pickup, putpickup, Shipping, shippingGet, singleShippingGet, } from "../controller/shipping-controller.js"
const router = express.Router()
router.route("/shipping").post(Shipping)
router.route("/getshipping").get(shippingGet)
router.route("/getshipping/:id").get(singleShippingGet)
router.route("/updatepickup/:id").put(putpickup)


export default router