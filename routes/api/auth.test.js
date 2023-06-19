const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const { User } = require("../../models/user");

const { DB_HOST_TEST, PORT_TEST } = process.env;

describe("test login", () => {
  let server = null;
  beforeAll(async () => {
    server = app.listen(PORT_TEST);
    await mongoose.connect(DB_HOST_TEST);
  });

  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });

  test("test login with correct data", async () => {
    const loginData = {
      email: "user-1-test@gmail.com",
      password: "p12345678",
    };

    const { statusCode, body } = await request(app)
      .post("/api/auth/login")
      .send(loginData);

    const { id } = jwt.verify(body.token, SECRET_KEY);
    const user = await User.findById(id);

    expect(statusCode).toBe(200);

    expect(body).toEqual(
      expect.objectContaining({
        user: expect.objectContaining({
          subscription: expect.any(String),
          email: expect.any(String),
        }),
        token: expect.any(String),
      })
    );

    expect(body).toHaveProperty("token");
    expect(user.email).toBe(loginData.email);

    expect(body.user).toHaveProperty("email", loginData.email);
    expect(body.user).toHaveProperty("subscription", "starter");
  });
});
