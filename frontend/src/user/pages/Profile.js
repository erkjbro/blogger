import { useState, useEffect, useContext } from 'react';
import { useParams, useRouteMatch, Switch, Route } from 'react-router-dom';

import ErrorMessage from '../../shared/components/UIKit/ErrorMessage/ErrorMessage';
import Loader from '../../shared/components/UIKit/Loader/Loader';
import ViewProfile from '../components/ViewProfile';
import EditProfile from '../components/EditProfile';
import useFetch from '../../shared/hooks/useFetch';
import { AuthContext } from '../../shared/context/AuthContext';
import './Profile.scss';

const Profile = () => {
  const [user, setUser] = useState();
  const { token } = useContext(AuthContext);

  const { userId } = useParams();
  const { path, url } = useRouteMatch();

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

        document.title = `${data.name}'s Profile | VOB`;

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
        <Switch>
          <Route path={path} exact render={() => <ViewProfile user={user} url={url} />} />
          <Route path={`${path}/edit`} render={() => <EditProfile user={user} url={url} />} />
        </Switch>
      )}
    </>
  );
}

export default Profile;
