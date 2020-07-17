const { Schema, model } = require('mongoose');

const reservaSchema = new Schema (
    {
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        guestId: {
            type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
            require: true,
            trim: true
        },
        hostId: {
            type:  Schema.Types.ObjectId, ref: 'Host' ,
            required: true,
            trim: true
        },
        value: {
            type: Number,
            require: true
        },
        totalValue: {
            type: Number,
            required: true
        }
    }
)

module.exports = model('Reserva', reservaSchema);