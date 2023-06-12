const express = require("express");
const Joi = require("joi");

const contactsService = require("../../models/contacts");
const { HttpError } = require("../../helpers");
const router = express.Router();

const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(7).required(),
});
router.get("/", async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId: id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
      throw HttpError(404, `Contact id: ${id}- not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId: id } = req.params;
    const result = await contactsService.removeContact(id);
    if (!result) {
      throw HttpError(404, `Contact id: ${id}- not found`);
    }
    res.json("Delete success");
    // res.status(204).send();
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId: id } = req.params;
    const result = await contactsService.updateContactById(id, req.body);
    if (!result) {
      throw HttpError(404, `Contact id: ${id}- not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
