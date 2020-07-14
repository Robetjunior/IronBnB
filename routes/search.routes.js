const { Router } = require('express');
const router = new Router();
const Host = require('../models/Host.model');
const Reserva = require('../models/Reserva.model');
const mongoose = require('mongoose');

//filtra os hosts do local
router.get('/search', async (req, res) =>{
    try{
        const localData = await Host.find({"local":req.query.search});
        res.render('search', {host: localData, userInSession: req.session.currentUser})
    }catch(err){
        throw new Error(err)
    }
});

//Direciona e mostra o details do host selecionado
router.get('/search/:hostId', async (req, res) =>  {
    try{
        const hostId = await Host.findById(req.params.hostId);
        // res.send({hostId})
        res.render('guest/details-host', {host : hostId, userInSession: req.session.currentUser});
    }catch(err){
        throw new Error(err);
    }
});


// Testes para direcionar form 
router.post('/search/:hostId', (req, res, next) => {
    const {startDate, endDate} = req.body;

    console.log(startDate, endDate)
})

//Testes para direcionar form 
router.post('/search/:hostId/reserva', async (req, res) => {
    try{
        const hostId = await Host.findById(req.params.hostId);
        console.log(hostId)
        const { startDate, endDate} = req.body;
        res.redirect('/search/:hostId/reserva')
    }catch(err){
        throw new Error(err);
    }
})

router.get('/search/:hostId/reserva/confirm', async(req, res)=>{
    const hostId = await Host.findById(req.params.hostId);
    res.render('confirm-host', {host: hostId})
})

router.post('/search/:hostId/reserva/confirm', async(req, res)=>{
    const hostId = await Host.findById(req.params.hostId);

    // Reserva.create({
    //     startDate: startDate,
    //     endDate: endDate,
    //     guestId: req.session.currentUser.id,
    //     hostId: hostId.id,
    //     totalValue: 
    // })

    //muda a disponibilidade = true
})

//criar um model reserva 
//com data inicio e fim
//preco atualizado 
//disponibildade = boolean




module.exports = router;