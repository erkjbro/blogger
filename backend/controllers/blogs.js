
export const getBlogs = (req, res, next) => {
  res.status(200).json({
    message: 'Fetched blog posts!'
  });
};
