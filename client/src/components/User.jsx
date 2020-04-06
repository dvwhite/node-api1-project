import React from 'react';

// Styled components
import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2%;
  padding 1%;
  border: 1px solid darkgray;
  background: whitesmoke;
  width: 33%;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 2px 4px 8px #444;
    transition: all 0.3s ease;
  }
`

const User = ({ data }) => {
  return (
    <Card>
      <h2>{data?.name}</h2>
      <p>{data?.bio}</p>
    </Card>
  );
}

export default User;
