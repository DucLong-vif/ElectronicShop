const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');

const sendMail = asyncHandler(async ({ email, html }) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_NAME, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"long gui cho do ban oi 👻" <no-reply@haylambanoi.com>', // sender address
          to: email, // list of receivers
          subject: "Hello ✔ Password", // Subject line
          text: "Hello world?", // plain text body
          html: html, // html body
    });

    return info
})


module.exports = sendMail