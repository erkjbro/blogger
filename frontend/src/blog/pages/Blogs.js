import { useState, useEffect } from 'react';

import BlogList from '../components/BlogList/BlogList';
import Loader from '../../shared/components/UIKit/Loader/Loader';
import './Blogs.scss';

const Blogs = () => {
  // eslint-disable-next-line
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => document.title = 'Blogs | VOB', []);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/blogs`);
        const resData = await response.json();

        if (!response.ok) {
          throw new Error(resData.message);
        }

        setBlogs(resData.data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })()
  }, []);

  const errorMessage = (
    <h1
      onClick={() => setError(null)}
      className="error__message"
    >
      {error}
    </h1>
  );

  return (
    <div className="blogs">
      {error && errorMessage}
      {isLoading && <Loader />}
      {blogs.length > 0 ? (
        <BlogList blogs={blogs} />
      ) : (
        <h1>No blogs...</h1>
      )}
    </div>
  );
};

export default Blogs;
