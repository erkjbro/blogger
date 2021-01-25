
let DUMMY_BLOGS = [
  {
    title: 'A Test Blog',
    content: 'Lorem Ipsum goes here...',
    author: 'u1'
  },
  {
    title: 'My First Blog!',
    content: 'Hey, this is my first blog post since signing up!',
    author: 'u2'
  }
];

export const getBlogs = (req, res, next) => {
  res.status(200).json({
    message: 'Fetched blogs!',
    blogs: DUMMY_BLOGS
  });
};
