import { useEffect, useState } from 'react';

const App = () => {
  const [response, setResponse] = useState();

  useEffect(() => {
    (async () => {
      try {
        // Loading True
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}`);
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        // Loading False
        setResponse(responseData);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div>
      <h1>Verbose Octo Blog</h1>
      {response && (
        <p>{response.message}</p>
      )}
    </div>
  );
}

export default App;
