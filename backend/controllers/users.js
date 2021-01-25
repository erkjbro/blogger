
export const getUsers = (req, res, next) => {
  res.status(200).json({
    message: "Fetched Users!"
  });
};
