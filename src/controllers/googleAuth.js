// dependencies
const axios = require('axios');
const file = require('../libs/data');
const { getTokens, getUrl } = require('../utils/google');

// controller scaffolding
const google = {};

// get the url
google.getURL = (req, res, next) => {
	const url = getUrl();
	res.json({ url });
};

// redirect route controller
google.redirect = async (req, res, next) => {
	// grave the code from redirect url
	const code = req.query.code;
	if (!code) return next('code not found');

	try {
		// get access_token and id_token for accessing farther information
		const { access_token, id_token, refresh_token } = await getTokens(code);
		const userUrl = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`;

		// get user information by access_token and id_token
		const user = await axios.get(userUrl, {
			headers: { Authorization: 'Bearer ' + id_token },
		});
		console.log(user);

		// saving data to local database file
		file.create(
			{ data: user.data, auth: { refresh_token, code } },
			(err) => {
				// response to the client after successfully saving
				if (err) return next(err);
			}
		);
		return res.json(user.data);
	} catch (error) {
		console.log(error);
		next(error);
	}
};

module.exports = google;
