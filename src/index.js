const express = require('express');
const path = require('path');
const morgan = require('morgan');
var methodOverride = require('method-override')
const handlebars = require('express-handlebars');
const { title } = require('process');
const app = express();
const port = 3000;
const route = require('./routes')
const db = require('./config/db');
const session = require('express-session');

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    if (req.session.user) {
        req.user = req.session.user;
        res.locals.user = req.user; 
    } else {
        res.locals.user = null;
    }
    next();
});

// Connect to db
db.connect();

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    partialsDir: path.join(__dirname, 'resources', 'views', 'partials'),
    helpers: {
        sum: (a, b) => a + b,
        eq: (a, b) => a === b,
        not: (a) => !a,
        json: (context) => JSON.stringify(context),
    }
}));


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//[route init]
route(app);

app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
