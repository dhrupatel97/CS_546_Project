const
    express = require('express'),
    tripsRouter = new express.Router(),

    tripsController = require('../data/trips.js')

tripsRouter.post('/', tripsController.all);
tripsRouter.get('/', tripsController.index);
tripsRouter.get('/itinerarys/:id', tripsController.iti);
tripsRouter.get('/:id', tripsController.show);
tripsRouter.post('/:id/activity', tripsController.createActivity);

module.exports = tripsRouter;