const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const { RequestError, sendEmail } = require("../../helpers");
const gravatar = require("gravatar");
const {nanoid} = require("nanoid");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email already exist");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const verificationToken = nanoid();

  
  const result = await User.create({name, email, password: hashPassword, avatarURL, verificationToken });
  const mail = {
    to: email,
    subject: "Подтверждение регистрации на сайте",
    html: `Нou have registered on the Find Your Dragon. Please click on the link to confirm your email. 
    After confirmation, return to the login page. <a href="https://test-back-end-raduka.herokuapp.com/api/auth/verify/${verificationToken}" target="_blank">Click to confirm.</a>`
};
await sendEmail(mail);
  res.status(201).json({
    email: result.email,
  });
};

module.exports = register;

