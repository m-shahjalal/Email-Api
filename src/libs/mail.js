const nodemailer = require('nodemailer');
const key = require('../config/key');

const sendMail = (options) => {
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			type: 'OAuth2',
			user: key.email,
			clientId: key.clientId,
			clientSecret: key.clientSecret,
			refreshToken: key.refreshToken,
		},
	});

	return transporter.sendMail({
		from: 'Shahjalal <lx.shahjalal@gmail.com>',
		to: options.email,
		subject: options.subject,
		text: options.text,
	});
};

module.exports = sendMail;
