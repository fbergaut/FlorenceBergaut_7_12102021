'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ User, Post }) {
            // define association here
            //userId
            this.belongsTo(User, { foreignKey: 'userId', as: 'user' });
            //postId
            this.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
        }
        toJSON() {
            return {...this.get(), id: undefined, userId: undefined }
        }
    };
    Comment.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'comments',
        modelName: 'Comment',
    });
    return Comment;
};