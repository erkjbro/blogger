import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './BlogDetails.scss';

const BlogDetails = (props) => {
  const [blog, setBlog] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { blogId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        console.log(`fetching blog matching ${blogId}`);

        setBlog({});
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    })()
  }, [blogId]);

  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>Error!</h1>}
      <h1>Blog Details!</h1>
      {blog && console.log(blog)}
    </div>
  );
};

export default BlogDetails;
