
import HttpError from '../models/http-error.js';

const checkAuth = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    // 1) Extract web token from request headers
    // 2) Check that token exists
    // 3) Decode token by verifying with jwt key
    // 4) Extract userId from decoded token

    const userId = process.env.DUMMY_USER_ID;

    if (!userId) {
      const error = new HttpError(
        'Authentication failed!',
        403
      );
      return next(error);
    }

    // To keep testing simple, a userId is being stored in the env.
    // This will be refined later when jwt's are introduced.
    req.userData = {
      userId: process.env.DUMMY_USER_ID
    };

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
