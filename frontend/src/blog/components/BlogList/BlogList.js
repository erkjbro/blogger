
import BlogItem from './BlogItem/BlogItem';
import './BlogList.scss';

const BlogList = (props) => {
  const { blogs } = props;

  return (
    <ul className="blog__list">
      {blogs.map(blog => (
        <li key={blog._id}>
          <BlogItem {...blog} />
        </li>
      ))}
    </ul>
  );
};

export default BlogList;
