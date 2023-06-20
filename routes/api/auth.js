const express = require("express");

const usersController = require("../../controllers/auth-controllers");

const { validateBody, authenticate, upload } = require("../../decorators");
const { schemas } = require("../../models/user");

const router = express.Router();
// Signup
router.post(
  "/register",
  validateBody(schemas.registerSchema),
  usersController.register
);

router.get("/verify/:verificationCode", usersController.verify);

router.post(
  "/verify",
  validateBody(schemas.userEmailSchema),
  usersController.resendVerifyEmail
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

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  usersController.updateAvatar
);

module.exports = router;
