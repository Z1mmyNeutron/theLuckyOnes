// const express = require("express");
// const cors = require("cors");
// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/message", (req, res) => {
//     res.json({ message: "Hello from server! " });

// });

// app.listen(8000, () => {
//     console.log(`Server is running on port 8000.`);
// });
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();

app.use(cors());
app.use(express.json());

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // or any other email service
    auth: {
        user: 'email', // Replace with your email
        pass: 'password',   // Replace with your email password or app-specific password
    },
});

// Endpoint to send an email
app.post("/send-email", (req, res) => {
    const { name, email, message } = req.body;

    // Validate input (optional but recommended)
    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const mailOptions = {
        from: email,
        to: 'crzimmer2@gmail.com', // Your email where the messages will be sent
        subject: `Message from ${name}`,
        text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: error.toString() });
        }
        res.status(200).json({ message: 'Email sent successfully', info });
    });
});

// Existing GET route
app.get("/message", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});
