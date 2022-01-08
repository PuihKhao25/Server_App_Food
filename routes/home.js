const express = require('express');
const router = express.Router();

const UserControler = require('../controller/Backend/UserControler')

router.get('/', UserControler.getHome)

module.exports = router;