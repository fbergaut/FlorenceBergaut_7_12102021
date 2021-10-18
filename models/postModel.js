const { DataTypes, Sequelize } = require("sequelize");

const PostModel = (sequelize) => {
    const Post = sequelize.define(
        "post", {
            post_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            picture: {
                type: DataTypes.STRING
            },
            video: {
                type: DataTypes.STRING
            },
            likers: {
                type: DataTypes.STRING
            },
            user_id: {
                type: DataTypes.STRING
            },
            comment_id: {
                type: DataTypes.STRING
            }
        }, { sequelize, freezeTableName: true }
    );
    return Post;
};

module.exports = PostModel;