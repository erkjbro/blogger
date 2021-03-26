import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ErrorMessage from '../../shared/components/UIKit/ErrorMessage/ErrorMessage';
import Loader from '../../shared/components/UIKit/Loader/Loader';
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
        console.log(resData.message);

        const createdAt = new Date(resData.data.createdAt).toLocaleString("en-US");
        const updatedAt = new Date(resData.data.updatedAt).toLocaleString("en-US");

        setBlog({
          ...resData.data,
          createdAt,
          updatedAt
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    })()
  }, [blogId]);

  return (
    <div className="blog__details">
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} onClick={() => setError(null)} />}
      {blog && (
        <>
          <h1>{blog.title}</h1>
          <h4>Author: {blog.creator.name}</h4>
          <h6>Last updated: {blog.updatedAt}</h6>
          <p>{blog.content}</p>
          <code>Written on: {blog.createdAt}</code>
        </>
      )}
    </div>
  );
};

export default BlogDetails;
