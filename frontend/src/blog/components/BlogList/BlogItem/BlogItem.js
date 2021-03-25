
import './BlogItem.scss';

const BlogItem = (props) => {
  const {
    creator,
    content,
    title,
    createdAt,
    updatedAt
  } = props;

  return (
    <li className="blog__item">
      <h2>{title}</h2>
      <h5>Creator: {creator.name}</h5>
      <p>{content}</p>
      <code>Created on: {createdAt}</code>
      <code>Last updated: {updatedAt}</code>
    </li>
  );
};

export default BlogItem;
