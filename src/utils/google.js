const queryString = require('querystring');
const axios = require('axios');
const { clientId, clientSecret } = require('../config/key');

const rootUri = 'http://localhost:5000';
const redirectUri = '/oauth/google/redirect';

const google = {};

// get login URL
google.getUrl = () => {
	const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
	const options = {
		redirect_uri: `${rootUri}${redirectUri}`,
		client_id: clientId,
		access_type: 'offline',
		response_type: 'code',
		prompt: 'consent',
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email',
		].join(' '),
	};
	return `${baseUrl}?${queryString.stringify(options)}`;
};

// getting the
google.getTokens = async (code) => {
	const url = `https://oauth2.googleapis.com/token`;
	const values = {
		code: code,
		client_id: clientId,
		client_secret: clientSecret,
		redirect_uri: `${rootUri}${redirectUri}`,
		grant_type: 'authorization_code',
	};
	const encoded = queryString.stringify(values);

	return axios
		.post(url, encoded, {
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		})
		.then((res) => res.data)
		.catch((error) => new Error(error.message));
};

google.getAccessToken = () => {};

module.exports = google;
