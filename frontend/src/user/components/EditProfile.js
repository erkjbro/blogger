import { Link } from 'react-router-dom';

import './EditProfile.scss';

const EditProfile = (props) => {
  const { user, url, onUserDelete } = props;

  return (
    <div className="edit__profile">
      <h1>Edit Profile</h1>
      <Link to={url}>View Profile</Link>
      <span>
        <label>
          Name:
          <input value={user.name} onChange={() => { }} />
        </label>
      </span>
      <span>
        <label>
          Email:
          <input value={user.email} onChange={() => { }} />
        </label>
      </span>
      <span>
        <button style={{ color: 'red' }} onClick={onUserDelete}>Delete Your Account</button>
      </span>
    </div>
  );
};

export default EditProfile;
