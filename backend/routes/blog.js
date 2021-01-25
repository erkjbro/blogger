import express from 'express';

import * as blogController from '../controllers/blog.js';

const router = express.Router();

router.get('/', blogController.getBlogs);

export default router;
