const
    passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    User = require('../models/User.js')

// create a user session based on user.id
passport.serializeUser((user, done) => {
    done(null, user.id)
})


passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})

// configuration for local signup
passport.use('local-signup', new localStrategy({
    // value for username will be email
    usernameField: 'email',
    // value for password will be password
    passwordField: 'password',
    // passwordConfirmationField: 'passwordConfirmation',
    // pass request body to callback function
    passReqToCallback: true
    // request cycle function
}, (req, email, password, done) => {
    // if (password === passwordConfirmation) {
    // search for a user by an email
    User.findOne({
        email: email
    }, (err, user) => {
        // if could not connect to server return the error
        if (err) return done(err)
        // if inputed email is already in use, return false
        if (user || (password !== req.body.passwordConfirmation)) return done(null, false, req.flash('signupMessage', 'There was an error signing up, please double check that all your information is correct!'))
        // create a new user 
        var newUser = new User(req.body)
        // use bcrypt to generate the password hash
        newUser.password = newUser.generateHash(password)
        // save the user function
        newUser.save((err) => {
            // if we couldn't save, console log the error
            if (err) return console.log(err)
            // if save successful, return the newUser
            return done(null, newUser)
        })
    })
    // }
    // else {
    //     //  return done(null,false, req.flash('passwordMessage', 'Passwords do not match'))
    // }
}))



// configuration for local login
passport.use('local-login', new localStrategy({
    // value for username will be email
    usernameField: 'email',
    // value for password field
    passwordField: 'password',
    // use request body in the callback function
    passReqToCallback: true
    // request cycle function
}, (req, email, password, done) => {
    // find user by email function
    User.findOne({
        email: email
    }, (err, user) => {
        // if there's a problem connecting to the server, return the error
        if (err) return done(err)
        // if no error(null) check user and password
        if (!user || !user.validPassword(password)) {
            // if user cant be found or password in not validated flash message
            return done(null, false, req.flash('loginMessage', "There was a problem logging in. Please try again"))
        }
        // successful login
        return done(null, user)
    })
}))

module.exports = passport