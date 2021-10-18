const { DataTypes, Sequelize } = require("sequelize");

const CommentModel = (sequelize) => {
    const Post = sequelize.define(
        "comment", {
            comment_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false
            },
            text: {
                type: DataTypes.TEXT
            },
            post_id: {
                type: DataTypes.STRING
            },
            user_id: {
                type: DataTypes.STRING
            }
        }, { sequelize, freezeTableName: true }
    );
    return Comment;
};

module.exports = CommentModel;