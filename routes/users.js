const
    express = require('express'),
    usersRouter = new express.Router(),
    usersController = require('../data/users.js')


usersRouter.get('/', usersController.index)
usersRouter.get('/signup', usersController.signupShow)
usersRouter.post('/signup', usersController.signupCreate)
usersRouter.get('/login', usersController.loginShow)
usersRouter.post('/login', usersController.loginCreate)
usersRouter.get('/profile', isLoggedIn, usersController.show)
usersRouter.post('/profile', isLoggedIn, usersController.create)
usersRouter.get('/logout', usersController.logout)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next()
    res.redirect('/')
}

module.exports = usersRouter;