const
    mongoose = require('mongoose')
tripSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    numbe: {
        type: String
    },
    description: {
        type: String,
        default: 'Description not yet added'
    },
    date: {
        type: String
    },
    photo: {
        type: String
    },
    activities: [{
        day: {
            type: String
        },
        do: {
            type: String
        }
    }]

});

module.exports = mongoose.model('Trip', tripSchema)