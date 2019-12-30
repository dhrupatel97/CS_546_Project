const Trip = require('../models/Trip');
const Activity = require('../models/Activity');
const Personal = require('../models/Personal');

module.exports = {
    index: (req, res) => {
        Personal.find({}, (err, trips) => {
            // res.json(trips)
            res.render('../views/trips/user-trip', {
                list: trips
            })
        })
    },
    all: (req, res) => {
        const search = req.body.search;
        const date = req.body.date;

        Trip.find({
            name: search
        }, (err, trips) => {
            res.render('../views/trips/all-trips', {
                list: trips
            });
        })
    },
    iti: (req, res) => {
        const n = req.params.id;
        Trip.find({
            numbe: n
        }, (err, trips) => {
            //res.json(trips)
            res.render('../views/trips/about-one', {
                list: trips
            })
        })
    },
    show: (req, res) => {
        Personal.findById(req.params.id, (err, trips) => {
            //res.json(trip)
            Activity.find({
                trip: req.params.id
            }, (err, activities) => {
                res.render('../views/trips/trip', {
                    trip: trips,
                    activity: activities
                })
            }).sort({
                date: 1
            })
        })
    },
    createActivity: (req, res) => {
        var newActivity = new Activity(req.body)
        newActivity.trip = req.params.id
        newActivity.user = req.user
        newActivity.save((err, activity) => {
            console.log(req.params.id)
            res.redirect(`/trips/${req.params.id}`)
            //res.json({success: true, message: "Activity created!", activity})
        })
    }
}