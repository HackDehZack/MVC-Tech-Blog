const { Blog } = require ('../models');

const blogPosts= [
    {
        title: 'Wut is M.V.C', 
        post: `Model View Controller! It is a software design pattern commonly used 
        for developing user interfaces that divides the program logic into three
        interconnected elements`, 
        user_id: 1,
       
    }, 
    {
        title: 'Object Relational Mapping', 
        post: `Object Relational Mapping (ORM) is a programming technique for converting data between 
        incompatible type systems using object-oriented programming languages, unless you're my grandma.`, 
       user_id: 2,
    }
];

const blogSeed = () => Blog.bulkCreate(blogPosts);

module.exports= blogSeed;