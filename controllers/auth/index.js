const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getUserData = require("./getUserData");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");

module.exports = {
    register,
    login,
    logout,
    getUserData,
    updateAvatar,
    verifyEmail,
    resendVerifyEmail,
}