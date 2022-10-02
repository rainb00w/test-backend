const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");

const getUserData = async (req, res) => {
  const { token } = req.user;
  const user = await User.findOne({ token: token });
  const tokenCheck = user.token;
  if (!user || tokenCheck === '') {
    throw RequestError(401, "Not authorized");
  }
  res.status(200).json({
    email: user.email,
    subscription: user.subscription,
  });
};

module.exports = getUserData;
