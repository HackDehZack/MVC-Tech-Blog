# MVC Tech Blog

A CMS-style blog site built from scratch to allow developers to publish their blog posts and engage with the community. This application follows the Model-View-Controller (MVC) architectural pattern, leverages Handlebars.js for views, Sequelize as the ORM, and express-session for authentication, and is deployed to Heroku.

## Screenshot

![techblog](https://github.com/HackDehZack/MVC-Tech-Blog/assets/140559436/7865e778-2428-449c-bef5-ca1c3ba4d8bd)


## Link to Deployed Application

https://hackdehzackmvctechblog-3cc73bad9f7c.herokuapp.com/ 

## Getting Started

To run this application, your environment should meet the following requirements:

- Node.js installed
- MySQL installed
- Heroku CLI installed (for deployment)

## Folder Structure

The application's folder structure follows the MVC paradigm:

- `models/` - Contains Sequelize models.
- `views/` - Contains Handlebars.js templates.
- `controllers/` - Contains Express.js routes that serve as controllers.
- `config/` - Contains configuration files, including the Sequelize connection file.
- `public/` - Contains static assets like stylesheets and client-side JavaScript.
- `db/` - Contains database schemas and seeds.
- `utils/` - Contains utility functions and middleware.

## Dependencies

- `express` - Web application framework
- `express-handlebars` - Handlebars view engine for Express
- `mysql2` - MySQL client for Node.js
- `sequelize` - ORM for Node.js
- `dotenv` - Loads environment variables from a `.env` file
- `bcrypt` - Library for hashing passwords
- `express-session` - Session middleware for authentication
- `connect-session-sequelize` - Sequelize session store

## Installation

1. Clone the repository to your local machine.
2. Navigate to the cloned directory and run `npm install` to install dependencies.
3. Create a `.env` file to store your MySQL credentials and session secret.
4. Run `npm run seed` to seed the database.
5. Start the server using `npm start`.
6. Access the application through `http://localhost:3000` in your browser.

## Deployment

This application is deployed to Heroku. Follow these steps to deploy:

1. Run `heroku create` to create a new Heroku app.
2. Provision a JawsDB MySQL add-on for your Heroku app to set up the MySQL database.
3. Set environment variables in Heroku for your `.env` configurations.
4. Deploy your branch to Heroku using `git push heroku main`.
5. Open the deployed application with `heroku open`.


## Support

For more information on the project, or if you encounter issues, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
