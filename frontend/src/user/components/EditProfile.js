import { Link } from 'react-router-dom';

import { Card } from '../../shared/components/UIKit';
import './EditProfile.scss';

const EditProfile = (props) => {
  const { user, setUser, url, onUserDelete, onUserEdit } = props;

  return (
    <div className="edit__profile">
      <h1>Edit Profile</h1>
      <Link to={url}>View Profile</Link>
      <Card className="edit__profile--card">
        <form className="edit__profile--form" onSubmit={onUserEdit}>
          <label>
            Name:
          <input
              value={user.name.value}
              onChange={event => setUser({
                ...user,
                name: {
                  value: event.target.value
                }
              })}
            />
          </label>
          <label>
            Email:
          <input
              className="primary__email"
              value={user.email.value}
              onChange={() => { console.warn("Primary email can't be changed.") }}
            />
          </label>
          <button type="submit">
            Save Changes
        </button>
        </form>
      </Card>
      <span>
        <button className="edit__profile--delete-btn" onClick={onUserDelete}>
          Delete Your Account
        </button>
      </span>
    </div>
  );
};

export default EditProfile;
