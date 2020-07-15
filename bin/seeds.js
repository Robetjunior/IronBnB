const mongoose = require('mongoose');
const Host = require('../models/Host.model');

require('../configs/db.config');

const host = [
    {local: 'Bela Vista', espaco: 'Quarto inteiro', qntHosp: 3, preco: 400, descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque convallis arcu in nibh placerat viverra. Integer dignissim gravida quam et accumsan. Ut at porttitor lorem. Nunc fermentum est vitae pellentesque pulvinaInteger dignissim gravida quam et accumsan."},
    {local: 'Bela Vista', espaco: 'Espaco inteiro', qntHosp: 2, preco: 600, descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque convallis arcu in nibh placerat viverra. Integer dignissim gravida quam et accumsan. Ut at porttitor lorem. Nunc fermentum est vitae pellentesque pulvinaInteger dignissim gravida quam et accumsan."},
    {local: 'Bela Vista', espaco: 'Quarto compartilhado', qntHosp: 1, preco: 250, descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque convallis arcu in nibh placerat viverra. Integer dignissim gravida quam et accumsan. Ut at porttitor lorem. Nunc fermentum est vitae pellentesque pulvinaInteger dignissim gravida quam et accumsan."},
    {local: 'Vila Mariana', espaco: 'Quarto inteiro', qntHosp: 5, preco: 700, descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque convallis arcu in nibh placerat viverra. Integer dignissim gravida quam et accumsan. Ut at porttitor lorem. Nunc fermentum est vitae pellentesque pulvinaInteger dignissim gravida quam et accumsan."},
    {local: 'Vila Mariana', espaco: 'Espaco inteiro', qntHosp: 2, preco: 900, descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque convallis arcu in nibh placerat viverra. Integer dignissim gravida quam et accumsan. Ut at porttitor lorem. Nunc fermentum est vitae pellentesque pulvinaInteger dignissim gravida quam et accumsan."},
    {local: 'Vila Mariana', espaco: 'Quarto compartilhado', qntHosp: 3, preco: 350, descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque convallis arcu in nibh placerat viverra. Integer dignissim gravida quam et accumsan. Ut at porttitor lorem. Nunc fermentum est vitae pellentesque pulvinaInteger dignissim gravida quam et accumsan."},
    {local: 'Jardins', espaco: 'Quarto inteiro', qntHosp: 10, preco: 750, descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque convallis arcu in nibh placerat viverra. Integer dignissim gravida quam et accumsan. Ut at porttitor lorem. Nunc fermentum est vitae pellentesque pulvinaInteger dignissim gravida quam et accumsan."},
    {local: 'Jardins', espaco: 'Espaco inteiro', qntHosp: 4, preco: 1000, descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque convallis arcu in nibh placerat viverra. Integer dignissim gravida quam et accumsan. Ut at porttitor lorem. Nunc fermentum est vitae pellentesque pulvinaInteger dignissim gravida quam et accumsan."},
    {local: 'Jardins', espaco: 'Quarto compartilhado', qntHosp: 2, preco: 400, descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque convallis arcu in nibh placerat viverra. Integer dignissim gravida quam et accumsan. Ut at porttitor lorem. Nunc fermentum est vitae pellentesque pulvinaInteger dignissim gravida quam et accumsan."},
    {local: 'Campinas', espaco: 'Quarto inteiro', qntHosp: 7, preco: 300, descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque convallis arcu in nibh placerat viverra. Integer dignissim gravida quam et accumsan. Ut at porttitor lorem. Nunc fermentum est vitae pellentesque pulvinaInteger dignissim gravida quam et accumsan."},
    {local: 'Campinas', espaco: 'Espaco inteiro', qntHosp: 15, preco: 350, descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque convallis arcu in nibh placerat viverra. Integer dignissim gravida quam et accumsan. Ut at porttitor lorem. Nunc fermentum est vitae pellentesque pulvinar."},
    {local: 'Campinas', espaco: 'Quarto compartilhado', qntHosp: 3, preco: 200, descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque convallis arcu in nibh placerat viverra. Integer dignissim gravida quam et accumsan. Ut at porttitor lorem. Nunc fermentum est vitae pellentesque pulvinar."},
    {local: 'Osasco', espaco: 'Quarto inteiro', qntHosp: 1, preco: 500, descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque convallis arcu in nibh placerat viverra. Integer dignissim gravida quam et accumsan. Ut at porttitor lorem. Nunc fermentum est vitae pellentesque pulvinar."},
    {local: 'Osasco', espaco: 'Espaco inteiro', qntHosp: 3, preco: 800, descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque convallis arcu in nibh placerat viverra. Integer dignissim gravida quam et accumsan. Ut at porttitor lorem. Nunc fermentum est vitae pellentesque pulvinar."},
    {local: 'Osasco', espaco: 'Quarto compartilhado', qntHosp: 1, preco: 350, descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque convallis arcu in nibh placerat viverra. Integer dignissim gravida quam et accumsan. Ut at porttitor lorem. Nunc fermentum est vitae pellentesque pulvinar."},
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