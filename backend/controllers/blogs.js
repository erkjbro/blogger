import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

import HttpError from '../models/http-error.js';
import Blog from '../models/blog.js';
import User from '../models/user.js';

export const getBlogs = async (req, res, next) => {
  // Find blogs - maybe add pagination later
  let blogs;
  try {
    blogs = await Blog.find({});
  } catch (err) {
    const error = new HttpError(
      'Something went wrong; blogs not found.',
      500
    );
    return next(error);
  }

  // Return message and all blogs
  res.status(200).json({
    message: 'Fetched blogs!',
    data: blogs
  });
};

export const getBlogById = async (req, res, next) => {
  // Extract blog id from params

  // Find blog matching bid

  // Return data
};

export const getBlogsByUserId = async (req, res, next) => {
  // Extract user id from params

  // Find user w/ uid and populate their blog data

  // Verify that blogs / user were found

  // Return blogs for specified uid
};

export const postBlog = async (req, res, next) => {
  // Express validation
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError(
      'Check your data!',
      422
    );
    return next(error);
  }

  // Extract data from body
  const { title, content } = req.body;
  // Extract userId from user data
  const { userId } = req.userData;

  // Create new blog w/ model
  const createdBlog = new Blog({
    title,
    content,
    creator: userId
  });

  // Find user
  let user;
  try {
    user = await User.findById(userId);

    if (!user) {
      const error = new HttpError(
        'Could not find a user for this id.',
        404
      );
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      'Creating blog failed; please try again later.',
      500
    );
    return next(error);
  }

  try {
    // Create mongoose session and start transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    // save blog
    await createdBlog.save({ session });

    // add blog to user
    user.blogs.push(createdBlog);

    // save user
    await user.save({ session });

    // commit transaction to save data to db
    await session.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating blog failed; please try again later.',
      500
    );
    return next(error);
  }

  // Return message and new blog data
  res.status(201).json({ blog: createdBlog });
};

export const patchBlog = async (req, res, next) => {
  // Express validation

  // Extract data from body
  // Extract blog id from params

  // Find blog in database

  // Extract user id from user data
  // Verify authZ

  // update blog data

  // save blog

  // Return message and update blog data
};

export const deleteBlog = async (req, res, next) => {
  // Extract blog id from params

  // Find blog w/ bid and populate author data

  // Extract user id from user data

  // Verify authZ

  // Create mongoose session and start transaction
  // remove blog
  // pull blog from author blogs
  // save author data
  // commit transaction

  // Return message
};
