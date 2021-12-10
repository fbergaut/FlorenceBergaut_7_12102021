'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ User }) {
            // define association here
            //userId
            this.belongsTo(User, { foreignKey: 'userId', as: 'user' })
        }
        toJSON() {
            return {...this.get(), id: undefined, userId: undefined }
        }
    };
    Post.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        posterUuid: {
            type: DataTypes.STRING,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Post must have a message' },
                notEmpty: { msg: 'Message must not be empty' }
            }
        },
        picture: {
            type: DataTypes.STRING
        },
        video: {
            type: DataTypes.STRING
        },
        likers: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        tableName: 'posts',
        modelName: 'Post',
    });
    return Post;
};