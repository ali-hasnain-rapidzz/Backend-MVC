import request from "supertest";
import { testPayload } from "../fixtures/payload";
import app from "../src/app";
import { setupTestDB } from "./utils/setupTestDB";

setupTestDB();

describe("SPN APIS", () => {
  describe("GET /v1/", () => {
    test("should return 200 OK", async () => {
      await request(app).get("/api/").expect(200);
    });
  });

  describe("POST /v1/", () => {
    test("should return 201 and successfully create new record if data is ok", async () => {
      const {
        body: { data },
      } = await request(app)
        .post("/api/")
        .send({})
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201);
      expect(data).toBe(testPayload);
    });
  });
});
