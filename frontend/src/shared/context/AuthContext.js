import { useState, createContext } from 'react';

const AuthContext = createContext()

const AuthProvider = (props) => {
  //eslint-disable-next-line
  const [isAuth, setIsAuth] = useState(false);
  //eslint-disable-next-line
  const [token, setToken] = useState();
  //eslint-disable-next-line
  const [userId, setUserId] = useState();

  const login = () => {};

  const logout = () => {};

  const value = {
    isAuth,
    token,
    userId,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
