const mail = require('./mail');
const google = require('./googleAuth');

module.exports = (app) => {
	app.get('/', (_, res) => res.json({ message: 'Hello world!' }));
	app.use('/users/mail', mail);
	app.use('/oauth/google', google);
};
