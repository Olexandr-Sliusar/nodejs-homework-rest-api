const express = require("express");

const usersController = require("../../controllers/auth-controllers");

const { validateBody, authenticate } = require("../../decorators");
const { schemas } = require("../../models/user");

const router = express.Router();
// Signup
router.post(
  "/register",
  validateBody(schemas.registerSchema),
  usersController.register
);

// Signin
router.post("/login", validateBody(schemas.loginSchema), usersController.login);

// Current
router.get("/current", authenticate, usersController.getCurrent);

// Logout
router.post("/logout", authenticate, usersController.logout);

// Subscription
router.patch(
  "/users",
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  usersController.updateSubscription
);

module.exports = router;
