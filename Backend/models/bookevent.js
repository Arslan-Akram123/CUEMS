const {Schema, model} = require('mongoose');


const bookingEventSchema = new Schema({
    user: {
            type: Schema.Types.ObjectId, 
            ref: 'User', required: true 
        },
    event: { 
            type: Schema.Types.ObjectId,
            ref: 'Event', required: true 
    },
    status: { 
            type: String,
            enum: ['pending', 'confirmed', 'cancelled'],
            default: 'pending' 
        },
    createdAt: {
            type: Date,
            default: Date.now 
        }
});

const BookEvent = model('BookEvent', bookingEventSchema);
module.exports = BookEvent;
