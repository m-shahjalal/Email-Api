const sendMail = require('../libs/mail');
const data = require('../libs/data');

const mail = {};

mail.get = (_, res) => {
	res.json({
		message: 'Provide mailing template by request body in post request',
	});
};
mail.post = async (req, res, next) => {
	const options = req.body;

	const email = data.read();

	try {
		const result = await sendMail(options);
		console.log(result);
		res.json(result);
	} catch (error) {
		next(error);
	}
};

mail.single = (req, res, next) => {
	const email = req.params.email;
};

module.exports = mail;
