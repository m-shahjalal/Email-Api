const logger = require('./logger');

module.exports = (app) => {
	app.use((_, _, next) => {
		let error = new Error('404 page not found');
		error.status = 404;
		next(error);
	});

	app.use((error, _, res, next) => {
		if (error.status === 404) {
			logger.error(error.message || error.error || 'page not found');
			return res.json({ error: error.message, status: error.status });
		} else {
			logger.error(error.message || 'internal server error');
			return res.json({
				error: error.message || 'internal server error',
				status: error.status || 500,
			});
		}
		next();
	});
};
