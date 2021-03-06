const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

module.exports = (app) => {
	app.use(cors());
	app.use(morgan('dev'));
	app.use(express.json());
	app.use(cookieParser());
};
