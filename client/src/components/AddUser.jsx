import React, { useState } from 'react';
import axios from 'axios';

// Styled components
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  background: whitesmoke;
  border: 1px solid darkgray;
  margin: 2%;
  padding: 1%;
`

const Input = styled.input`
  padding: 2%;
  font-size: 1.1rem;
  margin-top: 2%;
  width: 75%;

  &:focus {
    box-shadow: 1px 1px 1px lightskyblue, 3px 3px 6px dodgerblue;
  }
`

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

const AddUser = ({ addToUsers }) => {
  const initialValues = {name: "", bio:"", id: Date.now()}
  const [input, setInput] = useState(initialValues);

  // Helpers
  const addUserToApi = () => {
    if (input.name.length && input.bio.length) {
      axios.post('http://localhost:5000/api/users', input)
        .then(res => {
          addToUsers(input);
        })
    }
  }

  // Form handlers
  const handleChange = e => {
    e.preventDefault();
    setInput({...input, [e.target.name]: e.target.value});
  }

  const handleSubmit = e => {
    e.preventDefault();
    addUserToApi();
    setInput(initialValues);
  }
  
  return (
    <Form onSubmit={handleSubmit}>
      <h2>Add a User</h2>
      <Input
        type="text"
        name="name"
        value={input.name}
        placeholder="Name"
        onChange={handleChange}
      />
      <Input
        type="text"
        name="bio"
        value={input.bio}
        placeholder="Bio"
        onChange={handleChange}
      />
      <Button type="submit">Add</Button>
    </Form>
  );
}

export default AddUser;
