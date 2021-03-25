
import BlogItem from './BlogItem/BlogItem';

const BlogList = (props) => {
  const { blogs } = props;

  return (
    <ul>
      {blogs.map(blog => <BlogItem key={blog._id} {...blog} />)}
    </ul>
  );
};

export default BlogList;
