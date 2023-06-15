const express = require("express");

const contactsController = require("../../controllers/contacts-controllers");

const { schemas } = require("../../models/contact");

const { validateBody, isValidId } = require("../../decorators");
const router = express.Router();

router.get("/", contactsController.listContacts);

router.get("/:contactId", isValidId, contactsController.getContactById);

router.post(
  "/",
  validateBody(schemas.contactAddSchema),
  contactsController.addContact
);

router.delete("/:contactId", isValidId, contactsController.removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.contactAddSchema),
  contactsController.updateContactById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  contactsController.updateFavoriteContact
);

module.exports = router;
