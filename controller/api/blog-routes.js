const { Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const router = require('express').Router();

// Create a new blog post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Blog.create({
            user_id: req.session.userId,
            title: req.body.title,
            post: req.body.post,
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create post', error: err });
    }
});

// Delete a blog post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const result = await Blog.destroy({ where: { id: req.params.id } });
        if (result > 0) res.status(200).json({ message: 'Post deleted' });
        else res.status(404).json({ message: 'No post found with id' });
    } catch (err) {
        res.status(500).json({ message: 'No please dont kill me!!!', error: err });
    }
});

// Update a blog post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedPost = await Blog.update(req.body, { where: { id: req.params.id } });
        if (updatedPost > 0) res.status(200).json({ message: 'Post updated' });
        else res.status(404).json({ message: 'No post found with this id' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update post', error: err });
    }
});

// Add a comment to a post
router.post('/:id/comment', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            blog_id: req.params.id,
            user_id: req.session.userId,
            comment_post: req.body.comment
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(500).json({ message: 'Failed to add comment', error: err });
    }
});

// Get comments for a post
router.get('/:id/comments', withAuth, async (req, res) => {
    try {
        const comments = await Comment.findAll({ where: { blog_id: req.params.id } });
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get comments', error: err });
    }
});

module.exports = router;