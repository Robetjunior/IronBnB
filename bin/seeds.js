const mongoose = require('mongoose');
const Host = require('../models/Host.model');

require('../configs/db.config');

const host = [
    {local: 'Bela Vista', espaco: 'Quarto inteiro', qntHosp: 3, preco: 400},
    {local: 'Bela Vista', espaco: 'Espaco inteiro', qntHosp: 2, preco: 600},
    {local: 'Bela Vista', espaco: 'Quarto compartilhado', qntHosp: 1, preco: 250},
    {local: 'Vila Mariana', espaco: 'Quarto inteiro', qntHosp: 5, preco: 700},
    {local: 'Vila Mariana', espaco: 'Espaco inteiro', qntHosp: 2, preco: 900},
    {local: 'Vila Mariana', espaco: 'Quarto compartilhado', qntHosp: 3, preco: 350},
    {local: 'Jardins', espaco: 'Quarto inteiro', qntHosp: 10, preco: 750},
    {local: 'Jardins', espaco: 'Espaco inteiro', qntHosp: 4, preco: 1000},
    {local: 'Jardins', espaco: 'Quarto compartilhado', qntHosp: 2, preco: 400},
    {local: 'Campinas', espaco: 'Quarto inteiro', qntHosp: 7, preco: 300},
    {local: 'Campinas', espaco: 'Espaco inteiro', qntHosp: 15, preco: 350},
    {local: 'Campinas', espaco: 'Quarto compartilhado', qntHosp: 3, preco: 200},
    {local: 'Osasco', espaco: 'Quarto inteiro', qntHosp: 1, preco: 500},
    {local: 'Osasco', espaco: 'Espaco inteiro', qntHosp: 3, preco: 800},
    {local: 'Osasco', espaco: 'Quarto compartilhado', qntHosp: 1, preco: 350},
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