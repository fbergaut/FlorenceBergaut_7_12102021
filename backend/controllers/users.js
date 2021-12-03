const { User, Post, Followers, Following } = require('../models');

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
            include: [
                { model: Post, as: 'posts' },
                { model: Followers, as: 'followers' },
                { model: Following, as: 'followings' }
            ]
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
            include: [
                { model: Post, as: 'posts' },
                { model: Followers, as: 'followers' },
                { model: Following, as: 'followings' }
            ]
        })
        return res.json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Something went wrong !' })
    }
};

exports.modifyUser = async(req, res) => {
    const uuid = req.params.uuid
    const { bio } = req.body
    try {
        const user = await User.findOne({
            where: { uuid },
            include: [
                { model: Post, as: 'posts' },
                { model: Followers, as: 'followers' },
                { model: Following, as: 'followings' }
            ]
        })

        user.bio = bio

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

exports.follow = async(req, res) => {
    const userUuid1 = req.params.uuid
    const followersUuid = req.params.uuid
    const { followingUuid, userUuid0 } = req.body

    try {
        const userFollowing = await User.findOne({
            where: { uuid: userUuid1 }
        })

        const userIdFollowing = userFollowing.id

        // add to the following list
        const following = await Following.create({ followingUuid, userUuid1, userIdFollowing })

        const userFollowers = await User.findOne({
            where: { uuid: userUuid0 }
        })

        const userIdFollowers = userFollowers.id

        // add to the followers list
        const followers = await Followers.create({ followersUuid, userUuid0, userIdFollowers })
        console.log(followers)

        return res.status(200).send({ message: "Adds to following and followers list succeeded !" })
    } catch (err) {
        return res.status(500).json(err);
    }
};

exports.unfollow = async(req, res) => {
    const uuid = req.params.uuid

    try {
        await UserModel.findByIdAndUpdate(
            req.params.id, { $pull: { following: req.body.idToUnfollow } }, { new: true, upsert: true },
            (err, docs) => {
                if (!err) res.status(201).json(docs);
                else return res.status(400).jsos(err);
            }
        );
        // remove to following list
        await UserModel.findByIdAndUpdate(
            req.body.idToUnfollow, { $pull: { followers: req.params.id } }, { new: true, upsert: true },
            (err, docs) => {
                // if (!err) res.status(201).json(docs);
                if (err) return res.status(400).jsos(err);
            }
        );
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};