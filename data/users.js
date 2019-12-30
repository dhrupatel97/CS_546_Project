const
    passport = require('passport'),
    User = require('../models/User.js')
Trip = require('../models/Trip')
Personal = require('../models/Personal')

module.exports = {
    index: (req, res) => {
        User.find({}, (err, users) => {
            //res.json(users)
            res.redirect('/users/profile')
        })
    },

    loginShow: (req, res) => {
        res.render('login', {
            message: req.flash('loginMessage')
        })
    },

    loginCreate: passport.authenticate('local-login', {
        successRedirect: '/users/profile',
        failureRedirect: '/users/login'
    }),

    signupShow: (req, res) => {
        res.render('signup', {
            message: req.flash('signupMessage')
        })
    },

    signupCreate: passport.authenticate('local-signup', {
        successRedirect: '/users/profile',
        failureRedirect: '/users/signup'
    }),

    show: (req, res) => {
        Personal.find({
            user: req.user._id
        }, (err, trips) => {
            res.render('profile', {
                user: req.user,
                trip: trips
            })
        })
    },

    create: (req, res) => {
        newTrip = new Personal(req.body)
        newTrip.user = req.user._id
        //console.log(newTrip._id)
        newTrip.save((err, trip) => {
            res.redirect(`/trips/${newTrip._id}`)
        })
    },

    logout: (req, res) => {
        // destroy the session, redirect back home
        req.logout()
        res.redirect('/')
    },

}