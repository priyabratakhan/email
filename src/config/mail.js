const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
     host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "197506b2d70e86", // generated ethereal user
        pass: "ccad12ac9ea843",
    }
})