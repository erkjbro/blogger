
import { Button } from '../../shared/components/UIKit/FormElements';
import './ViewProfile.scss';

const ViewProfile = (props) => {
  const { user, url } = props;

  return (
    <div className="view__profile">
      {user ? (
        <>
          <h1>{user.name.value}'s Profile</h1>
          <span>
            <Button inverse to={`${url}/edit`}>Edit Profile</Button>
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
                <td>{user.blogs ? user.blogs.length : null}</td>
              </tr>
            </tbody>
          </table>
        </>
      ) : null}
    </div>
  );
};

export default ViewProfile;
