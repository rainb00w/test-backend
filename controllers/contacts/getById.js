const { Contact } = require("../../models/contact");

const { RequestError } = require("../../helpers");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ owner, _id: contactId });
  if (!result) {
    throw RequestError(404, "Not Found");
  }
  res.json(result);
};

module.exports = getById;

70;
