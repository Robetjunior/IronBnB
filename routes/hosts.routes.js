const express = require('express');
const router = express.Router();
const Host = require('../models/Host.model')

/* GET home page */

router.get('/details-host', async (req, res) => {  
    try{
        const hostList = await Host.find();
        console.log({hostList});
        res.render('guest/details-host', {host: hostList})
    }catch(err){
        throw new Error(err)
    }
});

module.exports = router;