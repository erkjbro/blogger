import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';

import ErrorMessage from '../../shared/components/UIKit/ErrorMessage/ErrorMessage';
import Loader from '../../shared/components/UIKit/Loader/Loader';
import useFetch from '../../shared/hooks/useFetch';
import { AuthContext } from '../../shared/context/AuthContext';
import './BlogDetails.scss';

const BlogDetails = () => {
  const [blog, setBlog] = useState();
  const { userId, token } = useContext(AuthContext);

  const { blogId } = useParams();

  const {
    isLoading,
    error,
    clearError,
    sendRequest
  } = useFetch(process.env.REACT_APP_BACKEND_URL);

  useEffect(() => blog ? document.title = `${blog.title} | VOB` : null, [blog]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await sendRequest(`blogs/${blogId}`);

        if (data) {
          const createdAt = new Date(data.createdAt).toLocaleString("en-US");
          const updatedAt = new Date(data.updatedAt).toLocaleString("en-US");

          setBlog({
            ...data,
            createdAt,
            updatedAt
          });
        }
      } catch (err) {
        console.error(err.message);
      }
    })()
  }, [sendRequest, blogId]);

  return (
    <>
      {error && <ErrorMessage message={error} onClick={clearError} />}
      {isLoading && <Loader />}
      {!isLoading && blog && (
        <div className="blog__details">
          <h1>{blog.title}</h1>
          <h4>Author: {blog.creator.name}</h4>
          <h6>Last updated: {blog.updatedAt}</h6>
          <p>{blog.content}</p>
          <code>Written on: {blog.createdAt}</code>
          {token && blog.creator._id === userId ? (
            <span>
              <Link to={`/blog/edit/${blogId}`}>
                Edit Blog
              </Link>
            </span>
          ) : null}
        </div>
      )}
    </>
  );
};

export default BlogDetails;
