import { Link } from "react-router-dom";
import { EditProfile } from "./EditProfile";

export const Profile = () => {
  return (
    <>
      <h1>Profile</h1>
      <div>
        <Link to="/profile-edit">
          <button>Edit Profile</button>
        </Link>
      </div>
    </>
  );
};
