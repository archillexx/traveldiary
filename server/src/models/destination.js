const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
    destination: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: String,
        required: true,
        ref: 'User'
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    photoUrl: {
        type: String,
        default: ''
    },
    
    latitude: {
        type: Number,
        default: ''
    },          
    longitude: {
        type: Number,
        default: ''
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    categories: [{
        type: mongoose.Schema.ObjectId,
        ref: "Category",
    }],
    saved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Destination', destinationSchema);
