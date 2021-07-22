import { beforeEach } from "@jest/globals";
import mongoose from "mongoose";
import supertest from "supertest";

import app from "../app.js";
import User from "../models/user.model.js";
import helper from "./test_helper.js";

beforeEach(async () => {
  await User.deleteMany({});

  for (let user of helper.initialUsers) {
    let userObject = new User(user);
    await userObject.save();
  }
});

const api = supertest(app);

describe("when there is initial users saved", () => {
  test("users are returned as JSON", async () => {
    const usersAtStart = await helper.usersInDB();

    const response = await api
      .get("/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
