
let DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Erik Brown',
    email: 'erik@example.com',
    password: 'password'
  },
  {
    id: 'u2',
    name: 'Super User',
    email: 'user@example.com',
    password: 'supersecret'
  }
];

export const getUsers = (req, res, next) => {
  res.status(200).json({
    message: "Fetched Users!",
    users: DUMMY_USERS
  });
};
