const
    mongoose = require('mongoose')
activitySchema = new mongoose.Schema({
    place: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: "No Address"
    },
    date: {
        type: String,
        required: true
    },
    time: String,
    address: {
        type: String,
        default: "No address entered."
    },
    description: {
        type: String,
        default: 'No Description'
    },
    rating: Number,
    trip: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Activity', activitySchema)