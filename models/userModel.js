const { DataTypes, Sequelize } = require("sequelize");

const UserModel = (sequelize) => {
    const User = sequelize.define(
        "user", {
            user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            firstname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            username: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            picture: {
                type: DataTypes.STRING,
                defaultValue: "./uploads/profil/random-user.png"
            },
            bio: {
                type: DataTypes.STRING(800),
            },
            followers: {
                type: DataTypes.INTEGER
            },
            following: {
                type: DataTypes.INTEGER
            },
            likes: {
                type: DataTypes.INTEGER
            }
        }, { sequelize, freezeTableName: true }
    );
    return User;
};

module.exports = UserModel;