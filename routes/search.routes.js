const { Router } = require('express');
const router = new Router();
const Host = require('../models/Host.model');
const mongoose = require('mongoose');

// router.get('/search', (req, res) => res.render('search'));

//filtra todos os hosts
// router.get('/search', async (req, res) =>{
//     try{
//         const localData = await Host.find();
//         // return res.send({localData})
//         res.render('search', {host: localData})
//     }catch(err){
//         throw new Error(err)
//     }
// });

//filtra os hosts do local
router.get('/search', async (req, res) =>{
    try{
        const localData = await Host.find({"local":req.query.search});
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
        res.render('guest/details-host', {host : hostId});
    }catch(err){
        throw new Error(err);
    }
});

router.get('/search/:hostId/reserva', async (req, res) => {
    try{
        const hostId = await Host.findById(req.params.hosId);
        res.render('guest/confirm-host', {host: hostId});
    }catch(err){
        throw new Error(err);
    }
})


module.exports = router;