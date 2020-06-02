import React, { useEffect, useState } from "react";
import axios from "axios";

// Component imports
import User from "./User";
import AddUser from "./AddUser";

// Styled components
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
`;

const Users = () => {
  const [users, setUsers] = useState([]);

  // Helpers
  const addToUsers = (newUser) => {
    setUsers([...users, newUser]);
  };

  const removeUser = (id) => {
    setUsers([...users.filter((user) => Number(user.id) !== Number(id))]);
  };

  const editUser = (id, editedUser) => {
    setUsers([
      ...users.filter((user) => Number(user.id) !== Number(id)),
      editedUser,
    ]);
  };

  // Get the users from the API backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.error(err.response));
  }, []);

  return (
    <Wrapper>
      {users?.map((user, idx) => (
        <User data={user} removeUser={removeUser} editUser={editUser} key={idx} />
      ))}
      <AddUser addToUsers={addToUsers} />
    </Wrapper>
  );
};

export default Users;
