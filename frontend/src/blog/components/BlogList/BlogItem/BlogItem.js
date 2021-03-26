import { Link } from 'react-router-dom';

import './BlogItem.scss';

const BlogItem = (props) => {
  const {
    _id,
    creator,
    content,
    title,
    createdAt,
    updatedAt
  } = props;

  return (
    <li className="blog__item">
      <Link to={`/blogs/${_id}`}>
        <h2>{title}</h2>
        <h5>Created by: {creator.name}</h5>
        <p>{content}</p>
        <span className="blog__item--timestamps">
          <code>Created on: {createdAt}</code>
          <code>Last updated: {updatedAt}</code>
        </span>
      </Link>
    </li>
  );
};

export default BlogItem;
