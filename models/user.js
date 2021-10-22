'use strict';
// const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Post, Comment }) {
            // define association here
            this.hasMany(Post, { foreignKey: 'userId', as: 'posts' })
            this.hasMany(Comment, { foreignKey: 'userId', as: 'comments' })
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
            allowNull: false,
            validate: {
                notNull: { msg: 'User must have a firstname' },
                notEmpty: { msg: 'Firstame must not be empty' }
            }
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'User must have a lastname' },
                notEmpty: { msg: 'Lastname must not be empty' }
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'User must have a username' },
                notEmpty: { msg: 'Username must not be empty' }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // isEmail,
                isEmail: { msg: 'Must be a valid email adress' },
                notNull: { msg: 'User must have a email' },
                notEmpty: { msg: 'Email must not be empty' },
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'User must have a password' },
                notEmpty: { msg: 'Password must not be empty' }
            }
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
        hooks: {
            beforeCreate: async(user) => {
                if (user.password) {
                    const salt = await bcrypt.genSaltSync(10, 'a');
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            },
            beforeUpdate: async(user) => {
                if (user.password) {
                    const salt = await bcrypt.genSaltSync(10, 'a');
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            }
        },
        instanceMethods: {
            validPassword: (password) => {
                return bcrypt.compareSync(password, this.password);
            }
        },
        sequelize,
        tableName: 'users',
        modelName: 'User',
    });
    return User;
};