// Import the necessary models.
const Blog = require('./Blog');
const User = require('./User');
const Comment = require('./Comment');

// Define the relationships between the models.
User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Blog.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Comment.belongsTo(Blog, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE',
});

// Export the models.
module.exports = { Blog, User, Comment };