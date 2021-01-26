import HttpError from '../models/http-error.js';
import User from '../models/user.js';

export const getUsers = async (req, res, next) => {
  // Find users w/o password
  // Fetch fails - 500

  // Respond w/ user data
};

export const postSignup = async (req, res, next) => {
  // Express Validation... or this might go in the route instead.

  // Get data from the body

  // Check if user exists already
  // Error - 500
  // Compare - User already exists - 422

  // Hash Password w/ bcrypt

  // Create User w/ model

  // Save new user to db
  // Error - 500

  // Sign JWT
  // token error - 500

  // Respond w/ 201 - userId, email, token
};

export const postLogin = async (req, res, next) => {
  // Express Validation... or this might go in the route instead.

  // Check if user exists

  // Compare passwords
  // Invalid credentials - 401

  // Sign JWT

  // Respond w/ userId, email, token
};
