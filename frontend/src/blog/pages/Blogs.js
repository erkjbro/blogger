import { useState, useEffect } from 'react';

import BlogList from '../components/BlogList/BlogList';
import ErrorMessage from '../../shared/components/UIKit/ErrorMessage/ErrorMessage';
import Loader from '../../shared/components/UIKit/Loader/Loader';
import useFetch from '../../shared/hooks/useFetch';
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
        const resData = await sendRequest('blogs');

        if (resData) {
          setBlogs(resData.data);
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
      {blogs.length > 0 ? (
        <BlogList blogs={blogs} />
      ) : !isLoading ? (
        <h1>No blogs...</h1>
      ) : null}
    </div>
  );
};

export default Blogs;
