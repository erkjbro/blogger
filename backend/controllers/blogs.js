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

  // Extract data from body
  // Extract uid from user data

  // Create new blog w/ model

  // Find user

  // Create mongoose session and start transaction
  // save blog
  // add blog to user
  // save user
  // commit transaction

  // Return message and new blog data
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
