const { Schema, model } = require('mongoose');


const hostSchema = new Schema(
    {
        local:{
            type: String,
            required: [true, 'Local is required'],
            trim: true,
        },
        title:{
            type: String,
            trim: true,
            required: [true, 'Title is required']
        },
        imgPath:{
            type:String,
            required: true
        },
        espaco:{
            type: String,
            enum: ['Quarto inteiro', 'Espaco inteiro', 'Quarto compartilhado'],
            required: true,        
        },
        qntHosp:{
            type: [Number, 'QntHosp is required'],
            required: true
        },
        preco:{
            type: [Number, 'Price is required'],
            required: true,
            trim: true            
        },
        reservado: {
            type: Boolean,
            default: false
        }, 
        descricao:{
            type: [String, 'Description is required'],
            trim: true,
            required: true,
        },
        comodidades:{
            type: [String]
        }
    }
);

module.exports = model('Host', hostSchema);