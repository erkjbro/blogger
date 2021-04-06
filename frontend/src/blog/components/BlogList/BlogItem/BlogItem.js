import { Link } from 'react-router-dom';

import Card from '../../../../shared/components/UIKit/Card/Card';
import './BlogItem.scss';

const BlogItem = (props) => {
  const {
    _id,
    creator,
    content,
    title
  } = props;

  const createdAt = new Date(props.createdAt).toLocaleString("en-US");
  const updatedAt = new Date(props.updatedAt).toLocaleString("en-US");

  return (
    <Card className="blog__item">
      <Link to={`/blogs/${_id}`}>
        <h2>{title}</h2>
        <h5>Created by: {creator.name}</h5>
        <p>{content}</p>
        <span className="blog__item--timestamps">
          <code>Written on: {createdAt}</code>
          <code>Last updated: {updatedAt}</code>
        </span>
      </Link>
    </Card>
  );
};

export default BlogItem;
