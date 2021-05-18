// dependencies
const fs = require('fs');
const path = require('path');

const data = {};

// base directory for the data folder
const basedir = path.join(__dirname, '../../data');

// create data
data.create = (user, cb) => {
	fs.writeFile(
		`${basedir}/${user.data.id}.json`,
		JSON.stringify(user),
		'utf8',
		(err, data) => {
			cb(err, data);
		}
	);
};

// read data
data.read = (fileName, cb) => {
	return fs.readFile(`${basedir}/${fileName}`, (err, data) => {
		cb(err, data.toString());
	});
};

// get all emails from the local database
data.getEmails = (cb) => {
	return fs.readdir(basedir, 'utf-8', (err, files) => {
		if (err) throw new Error(err.message);
		files.forEach((email) => {
			data.read(email, (err, data) => {
				cb(err, JSON.parse(data));
			});
		});
	});
};
module.exports = data;
