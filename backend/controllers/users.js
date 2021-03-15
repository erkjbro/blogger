import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';

import HttpError from '../models/http-error.js';
import User from '../models/user.js';

export const getUsers = async (req, res, next) => {
  let users;
  try {
    // Find users w/o password
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed; please try again later.',
      500
    );
    return next(error);
  }

  // Respond w/ user data
  res.json({
    users: users.map(user => user.toObject({ getters: true }))
  });
};

export const postSignup = async (req, res, next) => {
  // Express Validation... but this might go in the route instead.
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.error(errors);
    const error = new HttpError(
      'Invalid inputs passed; Please check your data.',
      422
    );
    return next(error);
  }

  // Get data from the body
  const { name, email, password } = req.body;

  // Check if user exists already
  try {
    const existingUser = await User.findOne({ email });

    // Compare - User already exists - 422
    if (existingUser) {
      const error = new HttpError(
        'User exists already; please login instead.',
        422
      );
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      'Signup failed; please try again later.',
      500
    );
    return next(error);
  }

  // Hash Password w/ bcrypt
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      'Singup failed; please try again.',
      500
    );
    return next(error);
  }

  // Create User w/ model
  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    blogs: []
  });

  // Save new user to db
  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      'Signup failed; please try again.',
      500
    );
    return next(error);
  }

  // Sign JWT
  // Token will be implemented later.

  // Respond w/ 201 - userId, email, token
  res.status(201).json({
    userId: createdUser.id,
    email: createdUser.email
  });
};

export const postLogin = async (req, res, next) => {
  // Express Validation... or this might go in the route instead.
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.error(errors);
    const error = new HttpError(
      'Invalid inputs passed; Please check your data.',
      422
    )
    return next(error);
  }

  // Get data from the body
  const { email, password } = req.body;

  // Check if user exists
  let existingUser;
  try {
    existingUser = await User.findOne({ email });

    if (!existingUser) {
      const error = new HttpError(
        'Invalid credentials; could not login.',
        422
      );
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      'Login failed; please try again later.',
      500
    );
    return next(error);
  }

  // Compare passwords
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);

    if (!isValidPassword) {
      // Invalid credentials - 401
      const error = new HttpError(
        'Invalid credentials; could not login.',
        401
      );
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      'Could not login; please check your credentials and try again.',
      500
    );
    return next(error);
  }

  // Sign JWT

  // Respond w/ userId, email, token
  res.json({
    userId: existingUser.id,
    email: existingUser.email
  });
};
