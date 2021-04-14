import { useState, useEffect, useContext } from 'react';

import useFetch from '../../shared/hooks/useFetch';
import { AuthContext } from '../../shared/context/AuthContext';
import { Card, ErrorMessage, Loader } from '../../shared/components/UIKit';
import { Button } from '../../shared/components/UIKit/FormElements';
import './Auth.scss';

const initialFormState = {
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
  const [form, setForm] = useState(initialFormState);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { login } = useContext(AuthContext);

  const {
    isLoading,
    error,
    clearError,
    sendRequest
  } = useFetch(process.env.REACT_APP_BACKEND_URL);

  useEffect(() => document.title = `${isLoginMode ? "Login" : "Signup"} | VOB`, [isLoginMode]);
  useEffect(() => setForm({ ...initialFormState }), [isLoginMode]);

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
      const { data } = await sendRequest(
        `users/${route}`,
        'POST',
        JSON.stringify(body),
        { 'Content-Type': 'application/json' }
      );

      const { userId, token } = data;

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
          <Card className="auth__card">
            <form className="auth__card--form" onSubmit={handleAuthSubmit}>
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
              <Button type="submit" className="form__submit--btn">
                {!isLoginMode ? "SIGNUP" : "LOGIN"}
              </Button>
            </form>
          </Card>
          <Button inverse  onClick={handleAuthToggle}>
            SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
          </Button>
        </div>
      )}
    </>
  );
};

export default Auth;
