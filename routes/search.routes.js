const { Router } = require('express');
const router = new Router();
const Host = require('../models/Host.model');
const mongoose = require('mongoose');

router.get('/search', (req, res) => res.render('search'));

// router.post('/')

module.exports = router;