const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSchemaValidationError } = require("../helpers")

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
      },
      dragon_id: {
        type: String,
        required: [true, 'Set name for contact'],
      },
      favorite: {
        type: Boolean,
        default: false,
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      }

});


contactSchema.post("save", handleSchemaValidationError)

const addScheme = Joi.object({
    name: Joi.string().required(),
    dragon_id: Joi.string().required(),
  });

  const updateFavorite = Joi.object({
    favorite: Joi.boolean().required().messages({
      'any.required': `missing field favorite`
    }),
  });

const Contact = model("contact", contactSchema);

const schemas = {
    addScheme,
    updateFavorite,
}

module.exports = {
    Contact,
    schemas,
 };

