const express = require('express');
const router = express.Router();
const Host = require('../models/Host.model')

/* GET home page */
router.get('/', (req, res) => res.render('index'));

router.post('/', (req, res) =>{
    const { local } = req.body;


    if( local === '' ){
        res.render('search', { errorMessage: 'Error'})
        return;
    }

    Host.find({local})
        .then(host => {
            if(!host){
                res.render('search', { errorMessagem: 'Nao tem host aqui'})
                return;
            }
            req.session.currentHost = host;
            return res.redirect('search')
        })
        .catch(err => {
            throw new Error(err);
        })
})


module.exports = router;