'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Post }) {
            // define association here
            this.hasMany(Post, { foreignKey: 'usreId' })
        }

        // fonction qui permet de cacher l'id en retour au user
        toJSON() {
            return {...this.get(), id: undefined }
        }
    };
    User.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
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
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
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
            type: DataTypes.STRING,
        },
        following: {
            type: DataTypes.STRING,
        },
        likes: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        tableName: 'users',
        modelName: 'User',
    });
    return User;
};