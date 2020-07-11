const { Schema, model } = require('mongoose');


const hostSchema = new Schema(
    {
        local:{
            type: String,
            required: [true, 'Local is required'],
            trim: true,
        },
        espaco:{
            type: String,
            enum: ['Quarto inteiro', 'Espaco inteiro', 'Quarto compartilhado'],
            required: true,        
        },
        qntHosp:{
            type: Number,
            required: true
        }
        
    }
);

module.exports = model('Host', hostSchema);