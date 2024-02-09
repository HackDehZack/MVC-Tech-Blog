// Import required modules
require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


// Import routes
const routes = require('./controller');

// Import sequelize connection
const sequelize = require('./config/connection');

// Create an Express app
const app = express();

// Define the port the app will listen on
const PORT = process.env.PORT || 3001;

// Set up Handlebars as the view engine
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Add middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up session middleware
const sess = {
    secret: 'Super secret secret',
    cookie: {
        maxAge: 60 * 60 * 1000, // 1 hour
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};
app.use(session(sess));

// Use the routes
app.use(routes);

// Sync the sequelize models and then start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on: http://localhost:${PORT}`);
        console.log('Create an account to start your blog!');
    });
});