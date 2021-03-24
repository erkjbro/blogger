import { useState, createContext } from 'react';

const AuthContext = createContext()

const AuthProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState();
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
