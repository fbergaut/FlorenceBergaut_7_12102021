const { User, Post } = require('../models')

exports.createPost = async(req, res) => {
    const { userUuid, message } = req.body
    try {
        const user = await User.findOne({
            where: { uuid: userUuid }
        })
        const post = await Post.create({ message, userId: user.id })
        return res.json(post)
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'Post was not post !'
        })
    }
};

exports.getAllPosts = async(req, res) => {
    try {
        const posts = await Post.findAll({ include: [{ model: User, as: 'user' }] })
        return res.json(posts)
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'Something went wrong !'
        })
    }
};

exports.getOnePost = async(req, res) => {
    const uuid = req.params.uuid
    try {
        const post = await Post.findOne({
            where: { uuid },
            include: [{ model: User, as: 'user' }]
        })
        return res.json(post)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Something went wrong !' })
    }
};
exports.modifyPost = async(req, res) => {
    const uuid = req.params.uuid
    const { message } = req.body
    try {
        const post = await Post.findOne({
            where: { uuid }
        })

        post.message = message

        await post.save()

        return res.json(post)
    } catch (err) {
        console.log(err)
        return res.status(500).json(post)
    }
};

exports.deletePost = async(req, res) => {
    const uuid = req.params.uuid
    try {
        const post = await Post.findOne({
            where: { uuid }
        })
        await post.destroy()
        return res.json({ message: 'Post deleted !' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Something went wrong !' })
    }
};