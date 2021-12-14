const { User, Post, Comment } = require('../models')

exports.createComment = async(req, res) => {
    const { commenterUuid, postUuid, text } = req.body
    try {
        const user = await User.findOne({
            where: { uuid: commenterUuid }
        })
        const post = await Post.findOne({
            where: { uuid: postUuid }
        })
        const comment = await Comment.create({ commenterUuid, commenterUsername: user.username, postUuid, text, userId: user.id, postId: post.id })
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
        const comments = await Comment.findAll({
            include: [
                { model: User, as: 'user' },
                { model: Post, as: 'post' }
            ]
        })
        return res.json(comments)
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
        const comment = await Comment.findOne({
            where: { uuid },
            include: [{ model: User, as: 'user' }, { model: Post, as: 'post' }]
        })
        return res.json(comment)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Something went wrong !' })
    }
};
exports.modifyComment = async(req, res) => {
    const uuid = req.params.uuid
    const { text } = req.body
    try {
        const comment = await Comment.findOne({
            where: { uuid }
        })

        comment.text = text

        await comment.save()

        return res.json(comment)
    } catch (err) {
        console.log(err)
        return res.status(500).json(comment)
    }
};

exports.deleteComment = async(req, res) => {
    const uuid = req.params.uuid
    try {
        const comment = await Comment.findOne({
            where: { uuid }
        })
        await comment.destroy()
        return res.json({ message: 'Comment deleted !' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Something went wrong !' })
    }
};