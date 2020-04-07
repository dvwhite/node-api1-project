import React from "react";
import axios from 'axios';

// Styled components
import styled from "styled-components";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2%;
  padding 1%;
  border: 1px solid darkgray;
  background: whitesmoke;
  width: 25%;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    box-shadow: 2px 4px 8px #444;
    transition: all 0.3s ease;

    & > span {
      background: coral;
    }
  }
`;

const DeleteIcon = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  height: 18px;
  width: 18px;
  border: 1px solid #444;
  border-radius: 50%;
  padding: 1%;
  font-size: 18px;
  line-height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: lightgray;

  &:hover {
    background: crimson !important;
    font-weight: bold;
  }
`;

const User = ({ data, removeUser }) => {

  const removeUserFromAPI = id => {
    axios.delete(`http://localhost:5000/api/users/${id}`)
      .then(res => {
        console.log(res.data)
        removeUser(id)
      })
      .catch(err => console.error(err.response));
  }

  return (
    <Card>
      <h2>{data?.name}</h2>
      <p>{data?.bio}</p>
      <DeleteIcon onClick={() => removeUserFromAPI(data?.id)}>x</DeleteIcon>
    </Card>
  );
};

export default User;
