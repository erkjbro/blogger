import express from 'express';

import * as blogController from '../controllers/blogs.js';

const router = express.Router();

router.get('/', blogController.getBlogs);

export default router;
