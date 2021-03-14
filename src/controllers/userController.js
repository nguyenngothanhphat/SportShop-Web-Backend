/* Model Database */
const User = require("../models/user");

const objectHelper = require("../helpers/objectHelper");

const getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({ message: "User not found" });
        }
        req.profile = user;
        next();
    })
}

const read = (req, res, next) => {
    req.profile.hash_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
}

// const update = (req, res) => {

// }

module.exports = {
    getUserById,
    read
}