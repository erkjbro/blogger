import { useState, useEffect, useContext } from 'react';
import { useParams, useRouteMatch, useHistory, Switch, Route } from 'react-router-dom';

import ErrorMessage from '../../shared/components/UIKit/ErrorMessage/ErrorMessage';
import Loader from '../../shared/components/UIKit/Loader/Loader';
import ViewProfile from '../components/ViewProfile';
import EditProfile from '../components/EditProfile';
import useFetch from '../../shared/hooks/useFetch';
import { AuthContext } from '../../shared/context/AuthContext';
import './Profile.scss';

let initialUserData;
const initialFormState = {
  name: {
    value: ''
  },
  email: {
    value: ''
  }
};

const Profile = () => {
  const [user, setUser] = useState();
  const { token, logout } = useContext(AuthContext);

  const { userId } = useParams();
  const { path, url } = useRouteMatch();
  const history = useHistory();

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

        initialUserData = data;
        const { name, email, ...rest } = data;

        setUser({
          ...rest,
          ...initialFormState,
          name: {
            value: name
          },
          email: {
            value: email
          }
        });
      } catch (err) {
        console.error(err.message);
      }
    })()
  }, [userId, token, sendRequest]);

  const handleUserEdit = async (event) => {
    event.preventDefault();

    const body = {
      ...initialUserData,
      name: user.name.value
    };

    console.log(body);

    try {
      await sendRequest(
        `users/${userId}`,
        "PATCH",
        JSON.stringify(body),
        {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      );

      history.push(url);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleUserDelete = async () => {
    try {
      await sendRequest(
        `users/${userId}`,
        "DELETE",
        null,
        { "Authorization": `Bearer ${token}` }
      );

      logout();

      history.push("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      {error && <ErrorMessage message={error} onClick={clearError} />}
      {isLoading && <Loader />}
      {!isLoading && (
        <Switch>
          <Route path={path} exact >
            <ViewProfile user={user} url={url} />
          </Route>
          <Route path={`${path}/edit`} >
            <EditProfile
              user={user}
              setUser={setUser}
              url={url}
              onUserEdit={handleUserEdit}
              onUserDelete={handleUserDelete}
            />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default Profile;
