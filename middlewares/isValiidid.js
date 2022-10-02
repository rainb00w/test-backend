const {isValidObjectId} = require("mongoose");

const {RequestError} = require("../helpers");

const isValidId = (req, _, next)  => {
    const { contactId } = req.params;
    const isCorrectedId = isValidObjectId(contactId);
    if(!isCorrectedId) {
        const error = RequestError(400, "Format is wrong");
        next(error);
    }
    next();
}

module.exports = isValidId;