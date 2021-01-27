import express from 'express';
import { check } from 'express-validator';

import * as userController from '../controllers/users.js';

const router = express.Router();

router.get(
  '/',
  userController.getUsers
);

router.post(
  '/signup',
  [
    check('name')
      .not()
      .isEmpty(),

    check('email')
      .normalizeEmail()
      .isEmail(),

    check('password')
      .isLength({ min: 6 })
  ],
  userController.postSignup
);

router.post(
  '/login',
  [
    check('email')
      .normalizeEmail()
      .isEmail(),

    check('password')
      .not()
      .isEmpty()
  ],
  userController.postLogin
);

export default router;
