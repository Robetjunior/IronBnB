const express = require('express');
const router = express.Router();
const Host = require('../models/Host.model')

/* GET home page */
router.get('/', (req, res) => res.render('index', {userInSession: req.session.currentUser}));

module.exports = router;