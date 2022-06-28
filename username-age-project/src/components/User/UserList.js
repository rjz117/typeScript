import "./UserList.css";
import Card from "../UI/Card";

const UserList = (props) => {
  let userList = props.users.map((user) => {
    return (
      <li key={user.id}>
        {user.username} ({user.age} Years old.)
      </li>
    );
  });

  return (
    <div>
      <Card className="users">
        <ul>{userList}</ul>
      </Card>
    </div>
  );
};

export default UserList;
