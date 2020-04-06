import React, { useEffect, useState } from "react";
import axios from "axios";

// Component imports
import User from './User';

// Styled components
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
`

const Users = () => {
  const [users, setUsers] = useState([]);

  // Get the users from the API backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => console.error(err.response));
  }, []);

  return (
    <>
      {users?.map(user => <User data={user} />)}
    </>
  );
};

export default Users;
