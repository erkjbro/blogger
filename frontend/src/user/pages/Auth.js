// eslint-disable-next-line
import { useState, useEffect, useContext } from 'react';

// import ErrorMessage from '../../shared/components/UIKit/ErrorMessage/ErrorMessage';
// import Loader from '../../shared/components/UIKit/Loader/Loader';
// import { AuthContext } from '../../shared/context/AuthContext';
import './Auth.scss';

const Auth = () => {
  // const { login, signup } = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [form, setForm] = useState({
    name: {
      value: ''
    },
    email: {
      value: ''
    },
    password: {
      value: ''
    }
  });

  useEffect(() => document.title = `${isLoginMode ? "Login" : "Signup"} | VOB`, [isLoginMode]);

  const handleAuthSubmit = (event) => {
    event.preventDefault();

    console.log(form);
    // Send login request and then store the token and user id.
    // Should be able to just call the context login or signup.
  };

  const handleAuthToggle = () => setIsLoginMode(prevState => !prevState);

  return (
    <>
      <div className="auth">
        <h2>Authentication</h2>
        <form onSubmit={handleAuthSubmit}>
          <h4>{isLoginMode ? "LOGIN" : "SIGNUP"}</h4>
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
    </>
  );
};

export default Auth;
