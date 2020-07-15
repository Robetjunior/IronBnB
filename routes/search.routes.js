const { Router } = require('express');
const router = new Router();
const Host = require('../models/Host.model');
const Reserva = require('../models/Reserva.model');
const mongoose = require('mongoose');

//filtra os hosts do local
router.get('/search', async (req, res) =>{
    try{
        const number  = req.query.number;
        if(!number){
            const localData = await Host.find({"local":req.query.search, "reservado": false});
            res.render('search', {host: localData, userInSession: req.session.currentUser})
        }
        const localData = await Host.find({"local":req.query.search, "reservado": false, "qntHosp": number});
        res.render('search', {host: localData, userInSession: req.session.currentUser})
    }catch(err){
        throw new Error(err)
    }
});

//Direciona e mostra o details do host selecionado
router.get('/search/:hostId', async (req, res) =>  {
    try{
        const hostId = await Host.findById(req.params.hostId);
        res.render('guest/details-host', {host : hostId, userInSession: req.session.currentUser});
    }catch(err){
        throw new Error(err);
    }
});

router.post('/search/:hostId/reserva', async (req, res) => {
    try{
        if(!req.session.currentUser){
            res.redirect('/login')
        }
        const result = await Host.findById(req.params.hostId);
        
        const { startDate, endDate } = req.body;

        const date1 = new Date(startDate)
        const date2 = new Date(endDate)
        
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

        const newReserva = await Reserva.create({
            startDate: startDate,
            endDate: endDate,
            guestId: req.session.currentUser._id,
            hostId: result._id,
            value: result.preco,
            totalValue: result.preco * diffDays
        });

        res.render('guest/confirm-host', {reserva: newReserva, userInSession: req.session.currentUser})
    }catch(err){
        throw new Error(err);
    }
})

router.get('/search/:hostId/reserva/confirm', async(req, res)=>{
    const hostId = await Host.findById(req.params.hostId);
    res.render('confirm-host', {host: hostId, userInSession: req.session.currentUser})
})

router.post('/search/:hostId/reserva/confirm', async(req, res)=>{
    try{
        if(!req.session.currentUser){
            res.redirect('/login')
        }
        console.log(req.params)

        const result1 = await Host.updateOne({"_id": req.params.hostId}, {$set: {"reservado": true}})

        console.log(result1)
        
        res.redirect('/userProfile');

    }catch(err){
        throw new Error(err)
    }
})

//criar um model reserva 
//com data inicio e fim
//preco atualizado 
//disponibildade = boolean




module.exports = router;