const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');
// Route to get all blogs for the homepage
router.get('/', async (req, res) => {
    try {
        const dbBlogs = await Blog.findAll({
            include: [{
                model: User,
                attributes: ['name'],
            }],
        });
        const allBlogs = dbBlogs.map(blog => blog.get({ plain: true }));
        res.render('homepage', {
            allBlogs,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).render('error', { err, loggedIn: req.session.loggedIn });
    }
});

// Route to get user's dashboard with their posts
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const dbBlogs = await Blog.findAll({
            where: { user_id: req.session.userId }
        });
        const posts = dbBlogs.map(post => post.get({ plain: true }));
        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).render('error', { err, loggedIn: req.session.loggedIn });
    }
});

// Route to display the blog post addition form
router.get('/blog/add', withAuth, (req, res) => {
    res.render('addUpdatePost', {
        loggedIn: req.session.loggedIn,
        update: false
    });
});

// Route to display the blog post update form
router.get('/blog/update/:id', withAuth, async (req, res) => {
    try {
        const dbBlog = await Blog.findByPk(req.params.id);
        if (dbBlog) {
            const blog = dbBlog.get({ plain: true });
            res.render('addUpdatePost', {
                loggedIn: req.session.loggedIn,
                update: true,
                blog
            });
        } else {
            res.status(404).send('Blog not found');
        }
    } catch (err) {
        res.status(500).render('error', { err, loggedIn: req.session.loggedIn });
    }
});

// Route to get a specific blog by id along with its comments
router.get('/blog/:id', withAuth, async (req, res) => {
    try {
        const dbBlog = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });
        if (dbBlog) {
            const blog = dbBlog.get({ plain: true });
            res.render('comments', { blog, loggedIn: req.session.loggedIn });
        } else {
            res.status(404).send('Blog not found');
        }
    } catch (err) {
        res.status(500).render('error', { err, loggedIn: req.session.loggedIn });
    }
});

// Route for user login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;