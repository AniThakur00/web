const user = require("../models/user");
const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, User) => {
        if(err || !User) {
            return res.status(400).json({
                error: "NO USER FOUND"
            });
        } 
        req.profile = User;
        next();
    })
    
}

exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.__v = undefined;
    return res.json(req.profile);
    
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set: req.body},
        {new: true , useFindAndModify: false},
        (err , user) => {
            if(err, !user){
                res.status(400).json({
                    error: "USER NOT FOUND/USER CANNOT BE UPDATED"
                })
            }
            user.salt = undefined;
            user.encry_password = undefined;
            user.__v = undefined;
            res.json(user)
        }
    )
}

