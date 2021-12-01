const { User, Post, Followers, Following } = require('../models');
const followers = require('../models/followers');

exports.createUser = async(req, res) => {
    const { firstname, lastname, username, email, password } = req.body
    try {
        const user = await User.create({ firstname, lastname, username, email, password })
        return res.json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
};

exports.getAllUsers = async(req, res) => {
    try {
        const users = await User.findAll({
            include: [{ model: Post, as: 'posts' }, { model: Followers, as: 'followers' }, { model: Following, as: 'followings' }]
        })
        return res.json(users)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Something went wrong !' })
    }
};

exports.getOneUser = async(req, res) => {
    const uuid = req.params.uuid
    try {
        const user = await User.findOne({
            where: { uuid },
            include: [{ model: Post, as: 'posts' }, { model: Followers, as: 'followers' }, { model: Following, as: 'followings' }]
        })
        return res.json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Something went wrong !' })
    }
};

exports.modifyUser = async(req, res) => {
    const uuid = req.params.uuid
    const { bio, followers, following } = req.body
    try {
        const user = await User.findOne({
            where: { uuid }
        })

        user.bio = bio
        user.followers = followers
        user.following = following

        await user.save()

        return res.json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
};

exports.deleteUser = async(req, res) => {
    const uuid = req.params.uuid
    try {
        const user = await User.findOne({
            where: { uuid }
        })
        await user.destroy()
        return res.json({ message: 'User deleted !' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Something went wrong !' })
    }
};