import request from "supertest";
import httpStatus from "http-status";
import app from "../../app.js";
import prisma from "../../config/prisma.js";

describe("Post Routes:", () => {
  describe("POST /api/v1/posts:", () => {
    const testPost = {
      title: "abc",
      body: "ac",
      category: "tech",
    };

    test(`Should throw ${httpStatus.BAD_REQUEST} if a required key is missing`, async () => {
      const res = await request(app)
        .post("/api/v1/posts")
        .send({ ...testPost, title: undefined })
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.message).toMatch("Validation error");
      expect(res.body.errors).toBeDefined();
    });

    test(`Should throw ${httpStatus.BAD_REQUEST} if a unknown key is in the payload`, async () => {
      const res = await request(app)
        .post("/api/v1/posts")
        .send({ ...testPost, abc: "xyz" })
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.message).toMatch("Validation error");
      expect(res.body.errors).toBeDefined();
    });

    test(`Should throw ${httpStatus.BAD_REQUEST} for invalid category`, async () => {
      const res = await request(app)
        .post("/api/v1/posts")
        .send({ ...testPost, category: "unknown" })
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.message).toMatch("Validation error");
      expect(res.body.errors).toBeDefined();
    });

    test(`Should return ${httpStatus.CREATED} and create post if everything is OK`, async () => {
      const res = await request(app)
        .post("/api/v1/posts")
        .send(testPost)
        .expect(httpStatus.CREATED);

      expect(res.body.data).toEqual({
        id: expect.any(String),
        ...testPost,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
      await prisma.post.delete({ where: { id: res.body.data.id } });
    });
  });
});
