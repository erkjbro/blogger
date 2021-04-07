import { createContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

let logoutTimer;

const AuthProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState();
  const [token, setToken] = useState();
  const [tokenExpiration, setTokenExpiration] = useState();

  const login = useCallback(({ uid, token, expiration }) => {
    setUserId(uid);
    setToken(token);
    setIsAuth(true);

    const tokenExp = expiration || new Date(new Date().getTime() + 1000 * 60 * 60);

    setTokenExpiration(tokenExp);

    localStorage.setItem(
      'vobUserData',
      JSON.stringify({
        uid,
        token,
        tokenExpiration: tokenExp.toISOString()
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpiration(null);
    setUserId(null);
    setIsAuth(false);

    localStorage.removeItem("vobUserData");
  }, []);

  useEffect(() => {
    try {
      const storedData = JSON.parse(localStorage.getItem("vobUserData"));

      if (
        storedData &&
        storedData.uid &&
        storedData.token &&
        new Date(storedData.tokenExpiration) < new Date()) {
        const { uid, token, tokenExpiration } = storedData;

        login({
          uid,
          token,
          expiration: new Date(tokenExpiration)
        });
      }
    } catch (err) {
      console.error(err.message);
      return null;
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpiration) {
      const timeRemaining = tokenExpiration.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, timeRemaining);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpiration, logout]);

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
