import express from 'express';
import { check } from 'express-validator';

import * as blogController from '../controllers/blogs.js';
// need to add a middleware for auth checks

const router = express.Router();

router.get(
  '/',
  blogController.getBlogs
);

router.get(
  '/:blogId',
  blogController.getBlogById
);

router.post(
  '/',
  [
    check('title')
      .not()
      .isEmpty(),

    check('content')
      .isLength({ min: 5 })
  ],
  blogController.postBlog
);

router.patch(
  '/:blogId',
  [
    check('title')
      .not()
      .isEmpty(),

    check('content')
      .isLength({ min: 5 })
  ],
  blogController.patchBlog
);

router.delete(
  '/:blogId',
  blogController.deleteBlog
);

export default router;
