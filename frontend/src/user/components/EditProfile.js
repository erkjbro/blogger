
import { Card } from '../../shared/components/UIKit';
import { Button } from '../../shared/components/UIKit/FormElements';
import './EditProfile.scss';

const EditProfile = (props) => {
  const { user, setUser, url, onUserDelete, onUserEdit } = props;

  return (
    <div className="edit__profile">
      <h1>Edit Profile</h1>
      <Button inverse to={url}>
        View Profile
      </Button>
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
          <Button type="submit" className="edit__profile--button">
            Save Changes
          </Button>
        </form>
      </Card>
      <span>
        <Button danger onClick={onUserDelete}>
          Delete Your Account
        </Button>
      </span>
    </div>
  );
};

export default EditProfile;
