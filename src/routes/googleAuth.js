const router = require('express').Router();
const { redirect, getURL } = require('../controllers/googleAuth');

router.get('/', (_, res) => res.json({ message: 'this is google auth route' }));
router.get('/link', getURL);
router.get('/redirect', redirect);

module.exports = router;
