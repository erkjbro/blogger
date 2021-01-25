import express from 'express';

import * as userController from '../controllers/users.js';

const router = express.Router();

router.get('/', userController.getUsers);

export default router;
