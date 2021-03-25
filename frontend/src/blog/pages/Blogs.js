import { useState, useEffect } from 'react';

import Loader from '../../shared/components/UIKit/Loader/Loader';

const Blogs = () => {
  // eslint-disable-next-line
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

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

  const errorMessage = <h1 onClick={() => setError(null)}>There was an error!</h1>;

  return (
    <div className="blogs">
      {error && errorMessage}
      {isLoading && <Loader />}
      <ul>
        {blogs.length > 0 ? (
          blogs.map(blog => (
            <li key={blog._id}>
              <h2>{blog.title}</h2>
              <span>Created by: {blog.creator.name}</span>
              <p>{blog.content}</p>
              <span>Created on: {blog.createdAt}</span>
              <br />
              <span>Last updated: {blog.updatedAt}</span>
            </li>
          ))
        ) : (<h1>No blogs...</h1>)}
      </ul>
    </div>
  );
};

export default Blogs;
