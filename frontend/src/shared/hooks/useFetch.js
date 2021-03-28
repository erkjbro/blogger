import { useState, useCallback } from 'react';

const useFetch = (baseUrl) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // Track active requests and use abort controller for cleanup
  // useRef helps track these separate signals

  const sendRequest = useCallback(async (
    url,
    method = 'GET',
    body = null,
    headers = {}
  ) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/${url}`, {
        method,
        headers,
        body
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message);
      }

      console.log(resData.message);
      return resData;
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [baseUrl]);

  const clearError = () => setError(null);

  // use useEffect to abort all current connections for cleanup

  return {
    isLoading,
    error,
    clearError,
    sendRequest
  };
};

export default useFetch;
