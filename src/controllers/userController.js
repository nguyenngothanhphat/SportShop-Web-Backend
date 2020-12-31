/* Model Database */
const User = require("../models/user");

const objectHelper = require("../helpers/objectHelper");

const getUserById = (req, res, next) => {
    
    const { query } = req;
    const userId = query.id;

    if (objectHelper.isEmpty(query)) {
        return res.status(400).json({ message: "Missing query" });
    }

    User.findById(userId).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({ message: "User not found" });
        }
        req.profile = user;
        console.log("req: ", req);
        // res.status(200).json({message: "OK"});
        return res.status(200).json({user: req.profile});
        // next()
    })
}

module.exports = {
    getUserById,
}