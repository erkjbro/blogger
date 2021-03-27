import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ErrorMessage from '../../shared/components/UIKit/ErrorMessage/ErrorMessage';
import Loader from '../../shared/components/UIKit/Loader/Loader';
import useFetch from '../../shared/hooks/useFetch';
import './BlogDetails.scss';

const BlogDetails = () => {
  const [blog, setBlog] = useState();
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
        const resData = await sendRequest(`blogs/${blogId}`);

        if (resData) {
          const createdAt = new Date(resData.data.createdAt).toLocaleString("en-US");
          const updatedAt = new Date(resData.data.updatedAt).toLocaleString("en-US");

          setBlog({
            ...resData.data,
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
      {blog && (
        <div className="blog__details">
          <h1>{blog.title}</h1>
          <h4>Author: {blog.creator.name}</h4>
          <h6>Last updated: {blog.updatedAt}</h6>
          <p>{blog.content}</p>
          <code>Written on: {blog.createdAt}</code>
        </div>
      )}
    </>
  );
};

export default BlogDetails;
