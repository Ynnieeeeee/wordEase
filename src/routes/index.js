const homeRouter = require('./home');
const myLibraryRouter = require('./myLibrary');
const aboutUsRouter = require('./aboutUs');
const feedbackRoute = require('./feedback');
const createrSetRoute = require('./createrSets');
const payRoute = require('./pay');
const logInRouter = require('./logIn');
const registerRoute = require('./register');
const flashcardRoute = require('./flashcard');
const setRoute = require('./sets');
const logOutRoute = require('./logOut');
const meRoute = require('./me');
const bodyParser = require('body-parser');
const lessonRoute = require('./lesson');
const testRoute = require('./test');
const vnpayRoute = require('./vnpay');
const dashboardRoute = require('./dashboard');

function route(app) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.get('/', (req, res) => {
        res.render('home', { title: 'Trang chủ' });
    });

    app.use('/home', homeRouter);
    app.use('/myLibrary', myLibraryRouter);
    app.use('/sets', setRoute);
    app.use('/me', meRoute);
    app.use('/feedback', feedbackRoute);
    app.use('/aboutUs', aboutUsRouter);
    app.use('/createrSets', createrSetRoute);
    app.use('/pay', payRoute);
    app.use('/logIn', logInRouter);
    app.use('/logOut', logOutRoute);
    app.use('/register', registerRoute);
    app.use('/flashcard', flashcardRoute);
    app.use('/lesson', lessonRoute);
    app.use('/test', testRoute);
    app.use('/', vnpayRoute);
    app.use('/dashboard', dashboardRoute);

}

module.exports = route;
