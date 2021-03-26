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
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/blogs/${blogId}`);
        const resData = await response.json();

        if (!response.ok) {
          throw new Error(resData.message);
        }

        console.log(resData);
        setBlog(resData.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    })()
  }, [blogId]);

  return (
    <div className="blog__details">
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>Error!</h1>}
      {blog && (
        <>
          <h1>{blog.title}</h1>
          <h5>Created by: {blog.creator}</h5>
          <p>{blog.content}</p>
        </>
      )}
    </div>
  );
};

export default BlogDetails;
