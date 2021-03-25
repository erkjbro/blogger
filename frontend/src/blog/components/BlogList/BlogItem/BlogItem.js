
const BlogItem = (props) => {
  const {
    creator,
    content,
    title,
    createdAt,
    updatedAt
  } = props;

  return (
    <li>
      <h2>{title}</h2>
      <span>Created by: {creator.name}</span>
      <p>{content}</p>
      <span>Created on: {createdAt}</span>
      <br />
      <span>Last updated: {updatedAt}</span>
    </li>
  );
};

export default BlogItem;
