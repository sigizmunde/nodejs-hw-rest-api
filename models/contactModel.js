const { Schema, model, SchemaTypes } = require("mongoose");

const { handleSaveErrors } = require("../helpers");

const contactMongooseSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactMongooseSchema.post("save", handleSaveErrors);

const Contact = model("contacts", contactMongooseSchema);

// ------------------------------- joi schemas start -------------------------------
const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().allow(""),
  phone: Joi.string()
    .pattern(/^[+]?[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/)
    .allow(""),
  favorite: Joi.boolean(),
}).or("email", "phone");

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().allow(""),
  phone: Joi.string()
    .pattern(/^[+]?[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/)
    .allow(""),
}).or("name", "email", "phone");

const favorContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const contactJoiSchemas = {
  addContactSchema,
  updateContactSchema,
  favorContactSchema,
};
// ------------------------------- joi schemas end ---------------------------------

module.exports = {
  Contact,
  contactJoiSchemas,
};
