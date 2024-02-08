// Middleware function to check if user is authenticated
const withAuth = (req, res, next) => {
    // If user is not logged in, redirect to login page
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        // If user is logged in, proceed to the next middleware or route handler
        next();
    }
};

module.exports = withAuth;
