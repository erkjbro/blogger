
import BlogItem from './BlogItem/BlogItem';
import './BlogList.scss';

const BlogList = (props) => {
  const { blogs } = props;

  return (
    <ul className="blog__list">
      {blogs.map(blog => <BlogItem key={blog._id} {...blog} />)}
    </ul>
  );
};

export default BlogList;
