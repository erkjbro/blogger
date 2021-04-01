import { Link } from 'react-router-dom';

import './ViewProfile.scss';

const ViewProfile = (props) => {
  const { user, url } = props;

  return (
    <div className="view__profile">
      {user ? (
        <>
          <h1>{user.name}'s Profile</h1>
          <span>
            <Link to={`${url}/edit`}>Edit Profile</Link>
          </span>
          <table>
            <tbody>
              <tr>
                <td>Name:</td>
                <td>{user.name}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{user.email}</td>
              </tr>
            </tbody>
          </table>
        </>
      ) : null}
    </div>
  );
};

export default ViewProfile;
