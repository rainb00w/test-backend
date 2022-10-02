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
    html: `Вы зарегистировались на сайте FindYourDragon. Пожалуйста нажмите на ссылку для подтверждения вашего Email. После подтверждения вернитесь на страницу Логина. <a href="http://localhost:3006/api/auth/verify/${verificationToken}" target="_blank">Нажмите для подтверждения email</a>`
};
await sendEmail(mail);
  res.status(201).json({
    email: result.email,
  });
};

module.exports = register;

