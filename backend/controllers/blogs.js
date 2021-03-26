import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

import HttpError from '../models/http-error.js';
import Blog from '../models/blog.js';
import User from '../models/user.js';

export const getBlogs = async (req, res, next) => {
  // Find blogs - maybe add pagination later
  let blogs;
  try {
    blogs = await Blog.find({}).populate('creator', 'name');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong; blogs not found.',
      500
    );
    return next(error);
  }

  // Return message and all blogs
  res.status(200).json({
    message: 'Fetched blogs successfully!',
    data: blogs
  });
};

export const getBlogById = async (req, res, next) => {
  // Extract blog id from params
  const { blogId } = req.params;

  // Find blog matching bid
  let blog;
  try {
    blog = await Blog.findById(blogId).populate('creator', 'name');

    if (!blog) {
      const error = new HttpError(
        'Could not find a blog for the provided id.',
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

  // Return data
  res.status(200).json({
    message: "Fetched blog by id successfully!",
    data: blog.toObject({ getter: true })
  });
};

export const getBlogsByUserId = async (req, res, next) => {
  // Extract userId from params
  const { userId } = req.params;

  // Find user matching userId and populate their blog data
  let blogUser;
  try {
    blogUser = await User.findById(userId, '-password').populate('blogs');

    // Verify that user exists and has blogs
    if (!blogUser || blogUser.blogs.length === 0) {
      const error = new HttpError(
        'Could not find blogs for the provided id.',
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

  // Return blogs for specified userId
  res.json({
    message: "Fetched blogs by userId successfully!",
    data: blogUser.blogs.map(blog => blog.toObject({ getters: true }))
  });
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
    user = await User.findById(userId, '-password');

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
  res.status(201).json({
    message: "Created new blog successfully!",
    data: createdBlog
  });
};

export const patchBlog = async (req, res, next) => {
  // Express validation
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError(
      'Invalid inputs passed; Check your data.',
      422
    );
    return next(error);
  }

  // Extract data from body
  const { title, content } = req.body;
  // Extract blog id from params
  const { blogId } = req.params;

  // Find blog in database
  let blog;
  try {
    blog = await Blog.findById(blogId);

    if (!blog) {
      const error = new HttpError(
        'Could not find blog with provided id.',
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

  // Extract user id from user data
  const { userId } = req.userData;

  // Verify authZ
  if (blog.creator.toString() !== userId) {
    const error = new HttpError(
      'You are not allowed to edit this blog.',
      401
    );
    return next(error);
  }

  // update blog data
  blog.title = title;
  blog.content = content;

  // save updated blog
  try {
    await blog.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong!',
      500
    );
    return next(error);
  }

  // Return message and updated blog data
  res.json({
    message: "Blog updated successfully!",
    data: blog.toObject({ getters: true })
  });
};

export const deleteBlog = async (req, res, next) => {
  // Extract blogId from params
  const { blogId } = req.params;

  // Find blog with blogId and populate creator data
  let blog;
  try {
    blog = await Blog.findById(blogId).populate('creator');

    if (!blog) {
      const error = new HttpError(
        'Could not find blog with provided id!',
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

  // Extract user id from user data
  const { userId } = req.userData;

  // Verify authZ
  if (blog.creator.id !== userId) {
    const error = new HttpError(
      'You are not allowed to delete this blog.',
      401
    );
    return next(error);
  }

  try {
    // Create mongoose session and start transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    // Remove blog
    await blog.remove({ session });

    // Pull blog from creator blogs
    blog.creator.blogs.pull(blog);

    // Save creator data
    await blog.creator.save({ session });

    // Commit transaction and save data to db
    await session.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong!',
      500
    );
    return next(error);
  }

  // Return message
  res.json({
    message: "Deleted a blog successfully!"
  });
};
