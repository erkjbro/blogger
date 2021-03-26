import { useEffect } from 'react';

const Profile = () => {
  useEffect(() => document.title = 'Profile | VOB', []);

  return (
    <div>
      <h2>User Profile</h2>
    </div>
  );
}

export default Profile;