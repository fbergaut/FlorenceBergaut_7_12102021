'use strict';
const bcrypt = require('bcrypt')

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Post, Comment, Followers, Following }) {
            // define association here
            this.hasMany(Post, { foreignKey: 'userId', as: 'posts' })
            this.hasMany(Comment, { foreignKey: 'userId', as: 'comments' })
            this.hasMany(Followers, { foreignKey: 'userId', as: 'followers' })
            this.hasMany(Following, { foreignKey: 'userId', as: 'followings' })
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
                notNull: { msg: 'Veuillez renseigner votre prénom' },
                notEmpty: { msg: 'Veuillez renseigner votre prénom' }
            }
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Veuillez renseigner votre nom de famille' },
                notEmpty: { msg: 'Veuillez renseigner votre nom de famille' }
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Veuillez choisir un pseudo' },
                notEmpty: { msg: 'Veuillez choisir un pseudo' }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: { msg: 'Email incorrect' },
                notNull: { msg: 'Veuillez renseigner votre email' },
                notEmpty: { msg: 'Veuillez renseigner votre email' },
            },
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Veuillez renseigner votre mot de passe' },
                notEmpty: { msg: 'Veuillez renseigner votre mot de passe' }
            }
        },
        picture: {
            type: DataTypes.STRING,
            defaultValue: "./uploads/profil/random-user.png"
        },
        bio: {
            type: DataTypes.STRING(800),
        }
    }, {
        hooks: {
            beforeCreate: async(user) => {
                if (user.password) {
                    const salt = await bcrypt.genSaltSync(10, 'a');
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            },
            // beforeUpdate: async(user) => {
            //     if (user.password) {
            //         const salt = await bcrypt.genSaltSync(10, 'a');
            //         user.password = bcrypt.hashSync(user.password, salt);
            //     }
            // }
        },
        // validate: {
        //     userExist(req, res){
        //         if (this.email === req.body.email) {
        //             throw new Error("Cet utilisateur existe déjà !")
        //         } else {
        //             console.log("Veuillez vous inscrire !");
        //         }
        //     }
        // },
        sequelize,
        tableName: 'users',
        modelName: 'User',
    });

    return User;
};