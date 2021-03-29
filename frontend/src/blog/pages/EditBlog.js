import { useState, useEffect, useContext } from 'react';
// import { useParams } from 'react-router-dom';

import Loader from '../../shared/components/UIKit/Loader/Loader';
import ErrorMessage from '../../shared/components/UIKit/ErrorMessage/ErrorMessage';
import useFetch from '../../shared/hooks/useFetch';
import { AuthContext } from '../../shared/context/AuthContext';
import './EditBlog.scss';

const blogForm = {
  title: {
    value: ''
  },
  content: {
    value: ''
  }
}

const EditBlog = (props) => {
  // eslint-disable-next-line
  const { token } = useContext(AuthContext);
  const [blog, setBlog] = useState(blogForm);
  // eslint-disable-next-line
  const { isLoading, error, clearError, sendRequest } = useFetch(process.env.REACT_APP_BACKEND_URL);

  useEffect(() => document.title = "New Blog | VOB", []);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    console.log(blog);
  }

  return (
    <>
      {error && <ErrorMessage message={error} onClick={clearError} />}
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="edit__blog">
          <h1>Write a New Blog!</h1>
          <form onSubmit={handleFormSubmit} className="edit__blog--form">
            <label>
              Title
              <br />
              <input
                type="text"
                id="title"
                placeholder="Title"
                value={blog.title.value}
                onChange={(event) => setBlog({
                  ...blog,
                  title: {
                    value: event.target.value
                  }
                })}
              />
            </label>
            <label>
              Content
              <br />
              <textarea
                id="content"
                placeholder="Content"
                value={blog.content.value}
                onChange={(event) => setBlog({
                  ...blog,
                  content: {
                    value: event.target.value
                  }
                })}
              />
            </label>
            <button type="submit">Save Blog</button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditBlog;
