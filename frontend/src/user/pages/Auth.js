import { useState, useEffect, useContext } from 'react';

import ErrorMessage from '../../shared/components/UIKit/ErrorMessage/ErrorMessage';
import Loader from '../../shared/components/UIKit/Loader/Loader';
import useFetch from '../../shared/hooks/useFetch';
import { AuthContext } from '../../shared/context/AuthContext';
import './Auth.scss';

const formData = {
  name: {
    value: ''
  },
  email: {
    value: ''
  },
  password: {
    value: ''
  }
};

const Auth = () => {
  const { login } = useContext(AuthContext);
  const { isLoading, error, clearError, sendRequest } = useFetch(process.env.REACT_APP_BACKEND_URL);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [form, setForm] = useState(formData);

  useEffect(() => document.title = `${isLoginMode ? "Login" : "Signup"} | VOB`, [isLoginMode]);
  useEffect(() => setForm({ ...formData }), [isLoginMode]);

  const handleAuthSubmit = async (event) => {
    event.preventDefault();

    let route = "login";
    let body = {
      email: form.email.value,
      password: form.password.value
    };

    if (!isLoginMode) {
      route = "signup";
      body.name = form.name.value;
    }

    try {
      const resData = await sendRequest(
        `users/${route}`,
        'POST',
        JSON.stringify(body),
        { 'Content-Type': 'application/json' }
      );

      console.log(resData.message);

      const { userId, token } = resData.data;

      login({
        uid: userId,
        token
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleAuthToggle = () => setIsLoginMode(prevState => !prevState);

  return (
    <>
      {error && <ErrorMessage message={error} onClick={clearError} />}
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="auth">
          <h2>Authentication</h2>
          <form onSubmit={handleAuthSubmit}>
            {!isLoginMode && (
              <label>
                Name
                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  value={form.name.value}
                  onChange={(event) => setForm({
                    ...form,
                    name: {
                      value: event.target.value
                    }
                  })}
                />
              </label>
            )}
            <label>
              E-Mail
            <input
                id="email"
                type="email"
                placeholder="E-Mail"
                value={form.email.value}
                onChange={(event) => setForm({
                  ...form,
                  email: {
                    value: event.target.value
                  }
                })}
              />
            </label>
            <label>
              Password
            <input
                id="password"
                type="password"
                placeholder="Password"
                value={form.password.value}
                onChange={(event) => setForm({
                  ...form,
                  password: {
                    value: event.target.value
                  }
                })}
              />
            </label>
            <button type="submit">{!isLoginMode ? "SIGNUP" : "LOGIN"}</button>
          </form>
          <button className="toggle" onClick={handleAuthToggle}>
            SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
          </button>
        </div>
      )}
    </>
  );
};

export default Auth;
