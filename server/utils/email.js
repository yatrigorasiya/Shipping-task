

import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Configure mail transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // or use SMTP settings
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // App password (not your actual password)
    },
});

// Function to send email
export const sendShipmentUpdateEmail = async (recipientEmail, trackingNumber, newStatus) => {
    if (!recipientEmail) {
        console.error("❌ Recipient email is missing.");
        return;
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipientEmail,
        subject: `Shipment Status Updated - Tracking No: ${trackingNumber}`,
        html: `
            <h3>Dear Customer,</h3>
            <p>Your shipment (Tracking Number: <b>${trackingNumber}</b>) has been updated to: <b>${newStatus}</b>.</p>
            <p>Thank you for choosing our service.</p>
            <p>Best Regards,<br/>Shipping Management Team</p>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("📧 Email sent:", info.response);
    } catch (error) {
        console.error("❌ Error sending email:", error.message);
    }
};
