import jwt from 'jsonwebtoken';

import HttpError from '../models/http-error.js';

const checkAuth = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    // 1) Extract web token from request headers
    const token = req.headers.authorization.split(' ')[1];

    // 2) Check that token exists
    if (!token) {
      throw new Error('Auth failed!');
    }

    // 3) Decode token by verifying with jwt key
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    // 4) Extract userId from decoded token
    req.userData = {
      userId: decodedToken.userId
    };

    // 5) Continue on to the routes requiring AuthN
    next();
  } catch (err) {
    const error = new HttpError(
      'Authentication failed!',
      403
    );
    return next(error);
  }
};

export default checkAuth;
