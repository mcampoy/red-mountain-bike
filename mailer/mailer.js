const nodemailer = require('nodemailer');

const mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'jack27@ethereal.email',
        pass: 'p45xPsuU85k7dJbBDc'
    }
};

module.exports = nodemailer.createTransport(mailConfig);