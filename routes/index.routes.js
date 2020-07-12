const express = require('express');
const router = express.Router();
const Host = require('../models/Host.model')

/* GET home page */
router.get('/', (req, res) => res.render('index'));

//filtra todos os hosts
router.get('/search', async (req, res) =>{
    try{
        const localData = await Host.find();
        console.log({localData})
        // return res.send({localData})
        res.render('search', {host: localData})
    }catch(err){
        throw new Error(err)
    }
});

module.exports = router;