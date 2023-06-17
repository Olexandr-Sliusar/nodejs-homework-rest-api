const express = require("express");

const contactsController = require("../../controllers/contacts-controllers");

const { schemas } = require("../../models/contact");

const { validateBody, isValidId, authenticate } = require("../../decorators");
const router = express.Router();

router.get("/", authenticate, contactsController.listContacts);

router.get(
  "/:contactId",
  authenticate,
  isValidId,
  contactsController.getContactById
);

router.post(
  "/",
  authenticate,
  validateBody(schemas.contactAddSchema),
  contactsController.addContact
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  contactsController.removeContact
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.contactAddSchema),
  contactsController.updateContactById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  contactsController.updateFavoriteContact
);

module.exports = router;
