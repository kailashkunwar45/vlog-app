import React, { useState } from 'react';
import { Container, Grow } from '@mui/material';
import Form from '../Form/Form';

const PostForm = () => {
  const [currentId, setCurrentId] = useState(0);

  return (
    <Grow in>
      <Container maxWidth="sm">
        <Form currentId={currentId} setCurrentId={setCurrentId} />
      </Container>
    </Grow>
  );
};

export default PostForm;
