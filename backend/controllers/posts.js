const { User, Post, Comment, Likers, Like } = require('../models');
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require('../utils/errorsUtils');

exports.createPost = async(req, res) => {
    let fileName;

    if (req.file !== null) {
        try {
            if (req.file.detectedMimeType !== "image/jpg" &&
                req.file.detectedMimeType !== "image/jpeg" &&
                req.file.detectedMimeType !== "image/png")
                throw Error("invalid file");

            if (req.file.size > 500000)
                throw Error("max size")
        } catch (err) {
            const errors = uploadErrors(err);
            return res.status(201).json({ errors });
        }

        fileName = req.body.posterUuid + Date.now() + '.jpg';

        await pipeline(
            req.file.stream,
            fs.createWriteStream(
                `../frontend/public/uploads/posts/${fileName}`
            )
        );
    }

    const { posterUuid, message, video } = req.body
    try {
        const user = await User.findOne({
            where: { uuid: posterUuid }
        })
        const post = await Post.create({
            posterUuid,
            message,
            picture: req.file !== null ? "./uploads/posts/" + fileName : "",
            video,
            userId: user.id
        })
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
        const posts = await Post.findAll({
            include: [
                { model: User, as: 'user' },
                { model: Comment, as: 'comments' },
                { model: Likers, as: 'likers' }
            ]
        })

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
            include: [
                { model: User, as: 'user' },
                { model: Comment, as: 'comments' },
                { model: Likers, as: 'likers' }
            ]
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

        return res.json({ message: 'Post modified !' })
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

exports.likePost = async(req, res) => {
    const postUuid = req.params.uuid
    const { posterUuid } = req.body

    try {
        // add to likers
        const postLiked = await Post.findOne({
            where: { uuid: postUuid }
        })

        const postId = postLiked.id

        await Likers.create({ posterUuid, postId })

        // add to like
        const likedPost = await User.findOne({
            where: { uuid: posterUuid }
        })

        const userId = likedPost.id

        await Like.create({ postUuid, userId })

        return res.status(200).send({ message: "Like registered !" })
    } catch (err) {
        return res.status(500).json(err);
    }
}

exports.unlikePost = async(req, res) => {
    const postUuid = req.params.uuid
    const { posterUuid } = req.body

    try {
        // delete from likers
        const postLikers = await Likers.findOne({
            where: { posterUuid: posterUuid }
        })
        await postLikers.destroy()

        // delete from likes
        const likedPost = await User.findOne({
            where: { uuid: posterUuid }
        })

        const userId = likedPost.id

        const postLike = await Like.findOne({
            where: {
                postUuid: postUuid,
                userId: userId
            }
        })
        await postLike.destroy()

        return res.status(200).send({ message: "Like has been removed !" })
    } catch (err) {
        return res.status(500).json(err);
    }
}