const { Router } = require('express');
const router = new Router();
const Host = require('../models/Host.model');
const mongoose = require('mongoose');

// router.get('/search', (req, res) => res.render('search'));

//filtra todos os hosts
router.get('/search', async (req, res) =>{
    try{
        const localData = await Host.find({"local":req.query.search});
        console.log({localData})
        // return res.send({localData})
        res.render('search', {host: localData})
    }catch(err){
        throw new Error(err)
    }
});

//Direciona e mostra o details do host selecionado
router.get('/search/:hostId', async (req, res) =>  {
    try{
        const hostId = await Host.findById(req.params.hostId);
        // res.send({hostId})
        res.render('guest/details-host', {host : hostId})
    }catch(err){
        console.error(err);
    }
});


module.exports = router;