import { useState, useEffect } from 'react';

import BlogList from '../components/BlogList/BlogList';
import useFetch from '../../shared/hooks/useFetch';
import { ErrorMessage, Loader } from '../../shared/components/UIKit';
import './Blogs.scss';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const {
    isLoading,
    error,
    clearError,
    sendRequest
  } = useFetch(process.env.REACT_APP_BACKEND_URL);

  useEffect(() => document.title = 'Blogs | VOB', []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await sendRequest('blogs');

        if (data) {
          setBlogs(data);
        }
      } catch (err) {
        console.error(err.message);
      }
    })()
  }, [sendRequest]);

  return (
    <div className="blogs">
      {error && <ErrorMessage message={error} onClick={() => clearError(null)} />}
      {isLoading && <Loader />}
      {!isLoading && blogs.length > 0 ? (
        <BlogList blogs={blogs} />
      ) : !isLoading ? (
        <h1>No blogs...</h1>
      ) : null}
    </div>
  );
};

export default Blogs;
