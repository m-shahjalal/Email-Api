const express = require('express');
const logger = require('./libs/logger');
const error = require('./libs/error');
const route = require('./routes');
const middleware = require('./middlewares');

const app = express();

const port = process.env.PORT || 5000;
middleware(app);
route(app);
error(app);

app.listen(port, () => logger.info(`Server is running on port ${port}`));
