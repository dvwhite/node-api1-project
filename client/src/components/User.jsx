import React, { useState } from "react";
import axios from "axios";

// Styled components
import styled from "styled-components";

const Card = styled.form`
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
      box-shadow: 2px 2px 4px #444;
      transition: all 0.4s ease;
    }

    & > button {
      background: #444;
      color: lightgray;
      box-shadow: 2px 2px 4px #444;
      transition: all 0.4s ease;
    }
  }
`;

const DeleteIcon = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  height: 27px;
  width: 27px;
  border: 1px solid #444;
  border-radius: 50%;
  padding: 0.5%;
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

  &:active {
    transform: translateY(3px);
    box-shadow: 1px 1px 1px #444;
  }
`;

const EditButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  right: 50px;
  height: 33px;
  width: 40px;
  outline: 0;
  border: 1px solid #444;
  border-radius: 10px;
  padding: 1%;
  font-size: 14px;
  line-height: 20px;
  background: lightgray;

  &:hover {
    background: dodgerblue !important;
    color: white !important;
  }

  &:active {
    transform: translateY(3px);
    box-shadow: 1px 1px 1px #444;
  }

`;

// Form components
const Input = styled.input`
  padding: 2%;
  font-size: 1.1rem;
  margin-top: 2%;
  width: 75%;
`;

const Button = styled.button`
  background: dodgerblue;
  color: snow;
  border-radius: 5px;
  padding: 2%;
  margin: 2%;
  border: 0;
  width: 15%;

  @media (max-width: 900px) {
    width: 25%;
  }

  @media (max-width: 700px) {
    width: 33%;
  }

  &:hover {
    opacity: 0.7;
  }
`

const User = ({ data, removeUser, editUser }) => {
  // Local state
  const initialValues = { name: data.name, bio: data.bio, id: data.id };
  const [input, setInput] = useState(initialValues);
  const [editing, setEditing] = useState(false);

  // Button handlers
  const removeUserFromAPI = (e, id) => {
    e.preventDefault();
    // Update the API
    axios
      .delete(`http://localhost:5000/api/users/${id}`)
      .then((res) => {
        console.log(res.data);
        removeUser(id);
      })
      .catch((err) => console.error(err.response));
  };

  const editUserInAPI = (id) => {
    // Update the user
    axios
      .put(`http://localhost:5000/api/users/${id}`, input)
      .then((res) => {
        console.log(res.data);
        editUser(id, input);
      })
      .catch((err) => console.error(err.response));
  };

  const toggleEditing = (e) => {
    e.preventDefault();
    setEditing(!editing);
  };

  // Form handlers
  const handleChange = (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editUserInAPI(data.id);
    toggleEditing(e);
  };

  return (
    <Card onSubmit={handleSubmit}>
      {editing ? <h2>Edit the User</h2> : null}
      {editing ? (
        <Input
          type="text"
          name="name"
          value={input.name}
          onChange={handleChange}
          placeholder="Name"
        />
      ) : (
        <h2>{data?.name}</h2>
      )}
      {editing ? (
        <Input
          type="text"
          name="bio"
          value={input.bio}
          onChange={handleChange}
          placeholder="Bio"
        />
      ) : (
        <p>{data?.bio}</p>
      )}
      {editing ? <Button type="submit">Submit</Button> : null}
      <DeleteIcon onClick={e => removeUserFromAPI(e, data?.id)}>x</DeleteIcon>
      <EditButton onClick={toggleEditing}>Edit</EditButton>
    </Card>
  );
};

export default User;
