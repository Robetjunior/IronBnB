const mongoose = require('mongoose');
const Host = require('../models/Host.model');
const { db } = require('../models/Host.model');

require('../configs/db.config');

const host = [
    {local: 'Bela Vista', espaco: 'Quarto inteiro', qntHosp: 3},
    {local: 'Bela Vista', espaco: 'Espaco inteiro', qntHosp: 2},
    {local: 'Bela Vista', espaco: 'Quarto compartilhado', qntHosp: 1},
    {local: 'Vila Mariana', espaco: 'Quarto inteiro', qntHosp: 5},
    {local: 'Vila Mariana', espaco: 'Espaco inteiro', qntHosp: 2},
    {local: 'Vila Mariana', espaco: 'Quarto compartilhado', qntHosp: 3},
    {local: 'Jardins', espaco: 'Quarto inteiro', qntHosp: 10},
    {local: 'Jardins', espaco: 'Espaco inteiro', qntHosp: 4},
    {local: 'Jardins', espaco: 'Quarto compartilhado', qntHosp: 2},
    {local: 'Campinas', espaco: 'Quarto inteiro', qntHosp: 7},
    {local: 'Campinas', espaco: 'Espaco inteiro', qntHosp: 15},
    {local: 'Campinas', espaco: 'Quarto compartilhado', qntHosp: 3},
    {local: 'Osasco', espaco: 'Quarto inteiro', qntHosp: 1},
    {local: 'Osasco', espaco: 'Espaco inteiro', qntHosp: 3},
    {local: 'Osasco', espaco: 'Quarto compartilhado', qntHosp: 1},
];

(async function seedDB(){
    try{
        const result = await Host.create(host);
        console.log(`Success! Created ${result.length} hosts added to db`);
        mongoose.connection.close();
    }catch(err){
        console.error(err);
    }
})()