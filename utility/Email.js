const nodemailer = require('nodemailer');
require('dotenv').config();
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAUTH2',
        user: process.env.EMAIL,
        pass: process.env.WORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
});

transporter.verify(((err, success) => {
    err ? console.log(err) : console.log(`=== Server is ready to take messages: ${success}`)
}));

module.exports = transporter;