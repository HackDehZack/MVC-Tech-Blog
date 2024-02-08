// Importing the necessary modules.
const { Model, DataTypes } = require('sequelize');
const bcrypt = require(`bcrypt`);
const sequelize = require(`../config/connection`);

// Define the User model.
class User extends Model {
    // Add a method to check the password.
    checkPassword(Password) {
        // Compare the provided password with the hashed password stored in the database.
        return bcrypt.compareSync(Password, this.password);
    }
}

// Initialize the User model.
User.init(
    {
        id: {
            // Define the id column.
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            // Define the name column.
            type: DataTypes.STRING,
            // Set the name column to be non-nullable.
            allowNull: false,
        },
        email: {
            // Define the email column.
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            // Set the password column to be validated as a string with a length between 5 and 10 characters.
            validate: {
                len: [5,10],
            },
        },
    },
    {
        // Define the hooks for the User model.
        hooks: {
            // Before creating a new user, hash the password.
            beforeCreate: async (newUser) => {
                try {
                    // Hash the password using bcrypt...???
                    newUser.password = await bcrypt.hash(newUser.password, 10);
                    // Return the new user object with the hashed password.
                    return newUser;
                } catch (err) {
                    // Log any errors.
                    console.log(err);
                    // Return the error.
                    return err;
                }
            },
            // Before updating a user, hash the password.
            beforeUpdate: async (updatedUser) => {
                try {
                    // Hash the password using bcrypt.
                    updatedUser.password = await bcrypt.hash(
                        updatedUser.password,
                        10
                    );
                    // Return the updated user object with the hashed psswrd
                    return updatedUser;
                } catch (err) {
                    // Log any errors.
                    console.log(err);
                    // Return the error.
                    return err;
                }
            },
        },
        // Connect the User model to the sequelize instance.
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: `user`,
    }

);

// Export the User model.
module.exports = User;