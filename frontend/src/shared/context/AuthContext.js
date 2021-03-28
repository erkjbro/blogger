import { createContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

const AuthProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState();
  const [token, setToken] = useState();

  const login = useCallback(({ uid, token }) => {
    setUserId(uid);
    setToken(token);
    setIsAuth(true);

    localStorage.setItem(
      'vobUserData',
      JSON.stringify({
        uid,
        token
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setIsAuth(false);

    localStorage.removeItem("vobUserData");
  }, []);

  useEffect(() => {
    try {
      const storedData = JSON.parse(localStorage.getItem("vobUserData"));

      if (storedData && storedData.uid && storedData.token) {
        const { uid, token } = storedData;

        login({
          uid,
          token
        });
      }
    } catch (err) {
      console.error(err.message);
      return null;
    }
  }, [login]);

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
