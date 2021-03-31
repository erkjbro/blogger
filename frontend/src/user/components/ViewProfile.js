import { Link } from 'react-router-dom';

import './ViewProfile.scss';

const ViewProfile = (props) => {
  const { user, url } = props;

  return (
    <div className="view__profile">
      {user ? (
        <>
          <h1>{user.name}'s Profile</h1>
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
          <span>
            <Link to={`${url}/edit`}>Edit</Link>
            <button>Delete Account</button>
          </span>
        </>
      ) : null}
    </div>
  );
};

export default ViewProfile;
