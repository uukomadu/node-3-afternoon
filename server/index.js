const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();

const checkForSession = require('./middlewares/checkForSession');

const swag_controller = require('./controller/swag_controller');
const auth_controller = require('./controller/auth_controller');
const cart_controller = require('./controller/cart_controller');
const search_controller = require('./controller/search_controller');

const app = express();

app.use( bodyParser.json() );
app.use(session({
    secret: 'whateverIWant',
    resave: false,
    saveUninitialized: true
}));
app.use( checkForSession );
app.use( express.static( `${__dirname}/build`) );

app.get('/api/swag', swag_controller.read);

app.post('/api/login', auth_controller.login);
app.post('/api/register', auth_controller.register);
app.post('/api/signout', auth_controller.signout);
app.get('/api/getUser', auth_controller.getUser);

app.post('/api/cart', cart_controller.add);
app.post('/api/cart/checkout', cart_controller.checkout);
app.delete('/api/cart', cart_controller.delete);

app.get( '/api/search', search_controller.search );

const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );