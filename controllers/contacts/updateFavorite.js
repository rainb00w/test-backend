const {Contact} = require("../../models/contact")

const { RequestError } = require("../../helpers");

const updateFavorite = async (req, res) => {

      if(!req.body) {
        throw RequestError(404, "Body not exist now");
      }
      const { contactId } = req.params;
      const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
   
      if (!result) {
        throw RequestError(404, "Not found");
      }
      res.json(result);
   
  }

  module.exports = updateFavorite;