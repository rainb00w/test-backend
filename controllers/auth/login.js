const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {User} = require("../../models/user");
const {SECRET_KEY} = process.env;
const {RequestError} = require("../../helpers");

const login = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw RequestError(401, "Email not found");
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if(!comparePassword) {
        throw RequestError(401, "Password wrong");
    }
    if(!user.verify) {
        throw RequestError(400, "Email not verified");
    }
    const payload = {
        id: user._id
    };

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"});
    await User.findByIdAndUpdate(user._id, {token});
    res.json({
        token,
        email: user.email,
        subscription: user.subscription,
    })
}

module.exports = login;