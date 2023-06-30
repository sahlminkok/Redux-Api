import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { getUsers } from "./redux/users/usersSlice";

function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.usersList);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div>
      {users.map((user, index) => (
        <div key={index}>
          <p>
            Name: {user.name.first} {user.name.last}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
