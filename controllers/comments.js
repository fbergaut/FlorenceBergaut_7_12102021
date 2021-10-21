const { User, Post, Comment } = require('../models')

exports.createComment = async(req, res) => {
    const { userUuid, postUuid, text } = req.body
    try {
        const user = await User.findOne({
            where: { uuid: userUuid }
        })
        const post = await Post.findOne({
            where: { uuid: postUuid }
        })
        const comment = await Comment.create({ text, userId: user.id, postId: post.id })
        return res.json(comment)
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'Comment was not post !'
        })
    }
};

exports.getAllComments = async(req, res) => {
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

exports.getOneComment = async(req, res) => {
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
exports.modifyComment = async(req, res) => {
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

exports.deleteComment = async(req, res) => {
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