
let DUMMY_BLOGS = [
  {
    id: 'b1',
    title: 'A Test Blog',
    content: 'Hey there! My name is Erik. I am a full-stack web developer that is passionate about the MERN stack. ',
    author: 'u1'
  },
  {
    id: 'b2',
    title: 'My First Blog!',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    author: 'u2'
  }
];

export const getBlogs = (req, res, next) => {
  res.status(200).json({
    message: 'Fetched blogs!',
    blogs: DUMMY_BLOGS
  });
};
