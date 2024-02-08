const sequelize = require('../config/connection');
const blogSeed = require('./blogSeeds');
const userSeed = require('./userSeeds');

// Function to seed blogs
const seedBlogs = async () => {
    await sequelize.sync({ force: true });

    await userSeed();
    await blogSeed();

    process.exit(0);
};

// Call the seedBlogs function
seedBlogs();