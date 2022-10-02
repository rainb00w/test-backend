const {Contact} = require("../../models/contact")

const { RequestError } = require("../../helpers");

const removeById = async (req, res) => {
    
      const { contactId } = req.params;
      const { _id: owner} = req.user;
      
      const contact = await Contact.findOne({ owner, _id: contactId });
      if (!contact) throw RequestError(404, 'Not authorized');

      const result = await Contact.findByIdAndRemove(contactId);
      if (!result) {
        throw RequestError(404, "Not found");
      }
      res.json({
        message: "contact deleted",
      });
  }

module.exports = removeById;


