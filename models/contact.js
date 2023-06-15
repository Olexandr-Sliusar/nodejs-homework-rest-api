const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");
const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
const phoneRegexp =
  /^(\+?\d{1,4}?[-.\s]?)?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      min: 3,
      max: 30,
      required: [true, "Set name for contact"],
    },
    email: { type: String, match: emailRegexp, required: true },
    phone: {
      type: String,
      min: 5,
      max: 20,
      match: phoneRegexp,
      required: true,
    },
    favorite: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string().pattern(phoneRegexp).min(5).max(20).required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({ favorite: Joi.boolean().required() });

const schemas = { contactAddSchema, updateFavoriteSchema };

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
