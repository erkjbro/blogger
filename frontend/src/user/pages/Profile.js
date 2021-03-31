import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import ErrorMessage from '../../shared/components/UIKit/ErrorMessage/ErrorMessage';
import Loader from '../../shared/components/UIKit/Loader/Loader';
import useFetch from '../../shared/hooks/useFetch';
import { AuthContext } from '../../shared/context/AuthContext';
import './Profile.scss';

const Profile = () => {
  const [user, setUser] = useState();
  const { token } = useContext(AuthContext);
  const { userId } = useParams();

  const { isLoading, error, clearError, sendRequest } = useFetch(process.env.REACT_APP_BACKEND_URL);

  useEffect(() => document.title = 'Profile | VOB', []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await sendRequest(
          `users/${userId}`,
          "GET",
          null,
          { "Authorization": `Bearer ${token}` }
        );

        setUser(data);
      } catch (err) {
        console.error(err.message);
      }
    })()
  }, [userId, token, sendRequest]);

  return (
    <>
      {error && <ErrorMessage message={error} onClick={clearError} />}
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="user__profile">
          {user ? (
            <>
              <h1>User Profile</h1>
              <p>{user.name}</p>
              <p>{user.email}</p>
            </>
          ) : (
            <>
              <h1>No user data...</h1>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Profile;
