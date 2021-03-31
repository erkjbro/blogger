import { Link } from 'react-router-dom';

import './EditProfile.scss';

const EditProfile = (props) => {
  const { user, url } = props;

  return (
    <div>
      <h1>Edit {user.name}'s Profile</h1>
      <Link to={url}>View</Link>
    </div>
  );
};

export default EditProfile;
