const emailTransporter = require('../utility/Email.js');
const express = require('express');
const router = express.Router();

router.post('/', (request, response) => {
    let mailOptions = {
        from: 'test@gmail.com',
        to: 'ss007jb@gmail.com',
        subject: 'Nodemailer API Test',
        text: 'Hi from your nodemailer API'
    };

    emailTransporter.sendMail(mailOptions, (err, data) => {
        err ? console.log("Error => ", err) : console.log('Email sent successfully!')
    });
});

module.exports = router;