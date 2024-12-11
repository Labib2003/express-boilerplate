import { z } from "zod";

const createPostSchema = z.object({
  body: z.strictObject({
    title: z.string(),
    body: z.string(),
    category: z.string(),
  }),
});

const updatePostSchema = z.object({
  body: z.strictObject({
    title: z.string().optional(),
    body: z.string().optional(),
    category: z.string().optional(),
  }),
});

const postValidator = { createPostSchema, updatePostSchema };
export default postValidator;
