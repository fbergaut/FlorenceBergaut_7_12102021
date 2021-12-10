const { User, Post } = require('../models');
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

        fileName = req.body.userUuid + Date.now() + '.jpg';

        await pipeline(
            req.file.stream,
            fs.createWriteStream(
                `../frontend/public/uploads/posts/${fileName}`
            )
        );
    }

    const { userUuid, message, video } = req.body
    try {
        const user = await User.findOne({
            where: { uuid: userUuid }
        })
        const post = await Post.create({
            userUuid,
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