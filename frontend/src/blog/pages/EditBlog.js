import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Loader from '../../shared/components/UIKit/Loader/Loader';
import ErrorMessage from '../../shared/components/UIKit/ErrorMessage/ErrorMessage';
import useFetch from '../../shared/hooks/useFetch';
import { AuthContext } from '../../shared/context/AuthContext';
import './EditBlog.scss';

const initialFormState = {
  title: {
    value: ''
  },
  content: {
    value: ''
  }
}

const EditBlog = (props) => {
  const history = useHistory();
  const { token } = useContext(AuthContext);
  const [blog, setBlog] = useState(initialFormState);

  const {
    isLoading,
    error,
    clearError,
    sendRequest
  } = useFetch(process.env.REACT_APP_BACKEND_URL);

  useEffect(() => document.title = "New Blog | VOB", []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const { title, content } = blog;
    const resPath = `blogs`;

    try {
      const resData = await sendRequest(
        resPath,
        "POST",
        JSON.stringify({
          title: title.value,
          content: content.value
        }),
        {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      );

      // Success Message
      console.log(resData.data);

      // Redirect
      history.push('/');
    } catch (err) {
      console.error(err.message);
    }
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
                placeholder="Title your blog..."
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
                placeholder="Start writing your blog..."
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
