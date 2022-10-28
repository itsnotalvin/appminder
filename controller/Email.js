const emailTransporter = require('../utility/Email.js');
const express = require('express');
const router = express.Router();

router.post('/send', (request, response) => {
    const { email } = request.body;
    let mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Welcome to App-Minder!',
        text: 'Hello from your App-Minder team! Glad to have you with us, and Good Luck with your job applications! Always remember - Fortune favours the bold!'
    };

    emailTransporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log('Error => ', err);
            response.status(500).json({ message: 'Due to an internal server error, we could not send your email!' });
        }
        else {
            console.log('Email sent successfully!');
            response.json({ message: 'Email sent successfully!' })
        }
    });
});

module.exports = router;