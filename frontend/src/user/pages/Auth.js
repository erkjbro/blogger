import { useEffect } from 'react';

const Auth = () => {
  useEffect(() => document.title = "Authentication | VOB", []);

  return (
    <div>
      <h2>Authentication</h2>
    </div>
  );
};

export default Auth;
