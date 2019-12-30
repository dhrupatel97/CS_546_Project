const
    //dotenv = require('dotenv').load(),
    express = require('express'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    mongoDBURL = 'mongodb://localhost/Trip_Planner',
    hbs = require('hbs');
usersRoutes = require('./routes/users.js'),
    tripsRoutes = require('./routes/trips');
//itinerarysRoutes = require('./routes/itinerarys')
session = require('express-session'),
    MongoDBStore = require('connect-mongodb-session')(session),
    flash = require('connect-flash'),
    passport = require('passport'),
    passportConfig = require('./config/passport.js'),
    methodOverride = require('method-override'),
    request = require('request')

//weather api
const apiKey = '43e17d975597a344bebe6fabf0eefaaa'


const
    PORT = process.env.PORT || 3000,
    mongoConnectionString = process.env.MONGODB_URI || 'mongodb://localhost/Trip_Planner'

mongoose.connect(mongoConnectionString, (err) => {
    console.log(err || 'Connected to MongoDB')
})

const store = new MongoDBStore({
    uri: mongoConnectionString,
    collection: 'sessions'
})

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
//app.use(hbsLayouts)
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(flash())
app.use(express.static(`${__dirname}/public`))
app.use(methodOverride('_method'))

app.use(session({
    secret: 'ssshhhhhh',
    cookie: {
        maxAge: 26280000000
    },
    resave: true,
    saveUninitialized: false,
    store: store
}))

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    res.locals.isLoggedIn = req.user;
    next();
})

app.get('/', (req, res) => {

    res.render('../views/home', {
        showFooter: false
    })
})

//weather
app.get('/weather', function (req, res) {
    res.render('weather', {
        weather: null,
        error: null
    });
})

app.get('/weather/:id', function (req, res) {
    console.log(req.params)
    let locale = req.params.id
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${locale}&units=imperial&appid=${apiKey}`
    request(url, function (err, response, body) {
        // res.send(body)
        res.render('../views/weather', {
            weather: JSON.parse(body)
        })
    })
})
app.get('/about', (req, res) => {
    res.render('about');
})

app.use('/trips', tripsRoutes)
app.use('/users', usersRoutes)



app.listen(PORT, (err) => {
    console.log(err || `Server connected on port ${PORT}`)
})