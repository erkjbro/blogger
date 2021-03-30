import { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';

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
};

const EditBlog = (props) => {
  const { editMode } = props;

  const [blog, setBlog] = useState(initialFormState);
  const { token } = useContext(AuthContext);

  const history = useHistory();
  const { blogId } = useParams();

  const {
    isLoading,
    error,
    clearError,
    sendRequest
  } = useFetch(process.env.REACT_APP_BACKEND_URL);

  useEffect(() => document.title = `${editMode ? "Edit" : "New"} Blog | VOB`, [editMode]);

  useEffect(() => {
    if (editMode && blogId) {
      (async () => {
        const { data } = await sendRequest(`blogs/${blogId}`);

        setBlog({
          ...initialFormState,
          title: {
            value: data.title
          },
          content: {
            value: data.content
          }
        });
      })()
    } else {
      setBlog({ ...initialFormState });
    }
  }, [editMode, blogId, sendRequest]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const { title, content } = blog;
    const reqPath = editMode ? `blogs/${blogId}` : blog;
    const reqMethod = editMode ? "PATCH" : "POST";

    try {
      await sendRequest(
        reqPath,
        reqMethod,
        JSON.stringify({
          title: title.value,
          content: content.value
        }),
        {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      );

      // [Success Message Goes Here...]

      // Redirect
      history.push('/blogs');
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
          {!editMode ? (
            <h1>Write Your New Blog!</h1>
          ) : (
            <h1>Edit Your Blog!</h1>
          )}
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
