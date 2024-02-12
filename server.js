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

// Add middleware to parse JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up session middleware
const sess = {
    secret: process.env.SESSION_SECRET || 'Super secret secret', // It's better to keep secrets out of the code
    cookie: {
        maxAge: 60 * 60 * 1000, // 1 hour
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // In production, set secure to true to send cookie over HTTPS
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // Trust first proxy
    sess.cookie.secure = true; // Serve secure cookies, requires HTTPS
}

app.use(session(sess));

// Use the routes
app.use(routes);

// Sync sequelize models and then start the server
sequelize.sync({ force: false }).then(() => {
    const port = process.env.PORT || 3000; // In case the PORT env variable is not set, fallback to 3000
    app.listen(port, () => {
        console.log(`Server running on: http://localhost:${port}`);
        console.log('Create an account to start your blog!');
    });
});