import { Router } from "express";
import postController from "./post.controller.js";
import validateRequest from "../../middleware/validateRequest.js";
import postValidator from "./post.validator.js";

const postRouter = Router();

postRouter
  .route("/")
  .post(
    validateRequest(postValidator.createPostSchema),
    postController.createPost,
  )
  .get(postController.getPaginatedPosts);
postRouter
  .route("/:id")
  .get(postController.getPostById)
  .patch(
    validateRequest(postValidator.updatePostSchema),
    postController.updatePost,
  )
  .delete(postController.deletePost);

export default postRouter;
