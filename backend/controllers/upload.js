const { User } = require('../models');
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/errorsUtils");

exports.uploadImg = async(req, res) => {
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

    const fileName = req.body.email + ".jpg"

    await pipeline(
        req.file.stream,
        fs.createWriteStream(
            `../frontend/public/uploads/profil/${fileName}`
        )
    );


    try {
        const user = await User.findOne({
            where: { uuid: req.body.uuid }
        })

        const pictureProfil = "./uploads/profil/" + fileName;

        user.picture = pictureProfil

        await user.save()

        return res.json(user)
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: "User non trouvé !" });
    }
};