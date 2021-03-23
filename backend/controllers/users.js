import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

import HttpError from '../models/http-error.js';
import User from '../models/user.js';
import Blog from '../models/blog.js';

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
  let token;
  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email
      },
      process.env.JWT_KEY,
      {
        expiresIn: '1h'
      }
    );
  } catch (err) {
    const error = new HttpError(
      'Something went wrong; please try again.',
      500
    );
    return next(error);
  }

  // Respond w/ 201 - userId, email, token
  res.status(201).json({
    message: "Signup completed successfully!",
    data: {
      userId: createdUser.id,
      email: createdUser.email,
      token
    }
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
  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email
      },
      process.env.JWT_KEY,
      {
        expiresIn: '1h'
      }
    );
  } catch (err) {
    const error = new HttpError(
      'Something went wrong; please try again.',
      500
    );
    return next(error);
  }

  // Respond w/ userId, email, token
  res.json({
    message: "Login completed successfully!",
    data: {
      userId: existingUser.id,
      email: existingUser.email,
      token
    }
  });
};

export const getUserById = async (req, res, next) => {
  // Extract userId from params
  const { userId } = req.params;

  // Find user with provided id
  let user;
  try {
    user = await User.findById(userId, '-password');

    // Verify user was found
    if (!user) {
      const error = new HttpError(
        'User could not be found with the provided id.',
        404
      );
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      'Something went wong; please try again.',
      500
    );
    return next(error);
  }

  // Verify AuthZ
  const uid = req.userData.userId;
  if (user.id !== uid) {
    const error = new HttpError(
      'You are not allowed to view this data.',
      401
    );
    return next(error);
  }

  // Return data matching specified user
  res.json({
    message: "Found user successfully!",
    data: user.toObject({ getters: true })
  });
};

export const patchUser = async (req, res, next) => {
  // Express validation
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError(
      'Check your data!',
      403
    );
    return next(error);
  }

  // Extract data from body
  const { name, email } = req.body;
  // Extract userId from params
  const { userId } = req.params;

  // Find user in database
  let user;
  try {
    user = await User.findById(userId);

    if (!user) {
      const error = new HttpError(
        'Could not find user with provided id.',
        404
      );
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      'Something went wrong.',
      500
    );
    return next(error);
  }

  // Extract user id from user data
  const uid = req.userData.userId;

  // Verify authZ
  if (user.id.toString() !== uid) {
    const error = new HttpError(
      'You are not allowed to access this data.',
      401
    );
    return next(error);
  }

  // Update user data
  user.name = name;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new HttpError(
        'Email already in use; could not be changed.',
        422
      );
      return next(error);
    } else {
      user.email = email;
    }
  } catch (err) {
    const error = new HttpError(
      'Something went wrong!',
      500
    );
    return next(error);
  }


  // Save updated user
  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong!',
      500
    );
    return next(error);
  }

  // Return message and updated user data
  res.json({
    message: "Updated user data successfully!",
    data: user
  });
};

export const deleteUser = async (req, res, next) => {
  // Extract userId from params
  const { userId } = req.params;

  // Find user in database & populate blogs (?)
  let user;
  let blogs;
  try {
    user = await User.findById(userId).populate('blogs');
    blogs = await Blog.find({ creator: userId });

    if (!user) {
      const error = new HttpError(
        'User not found with provided id.',
        404
      );
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      'Something went wrong!',
      500
    );
    return next(error);
  }

  // Verify AuthZ
  const uid = req.userData.userId;
  if (user.id.toString() !== uid) {
    const error = new HttpError(
      'You are not allowed to delete this user.',
      401
    );
    return next(error);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    await user.remove({ session });

    await Blog.deleteMany({ creator: userId }).session(session);

    await session.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong!',
      500
    );
    return next(error);
  }

  // Return success message
  res.json({
    message: "Deleted the user successfully!"
  });
};
