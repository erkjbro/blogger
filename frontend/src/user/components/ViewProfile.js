import { Link } from 'react-router-dom';

import './ViewProfile.scss';

const ViewProfile = (props) => {
  const { user, url } = props;

  return (
    <div className="view__profile">
      {user ? (
        <>
          <h1>{user.name.value}'s Profile</h1>
          <span>
            <Link to={`${url}/edit`}>Edit Profile</Link>
          </span>
          <table>
            <tbody>
              <tr>
                <td>Name:</td>
                <td>{user.name.value}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{user.email.value}</td>
              </tr>
              <tr>
                <td>Number of Blogs:</td>
                <td>{user.blogs.length}</td>
              </tr>
            </tbody>
          </table>
        </>
      ) : null}
    </div>
  );
};

export default ViewProfile;
