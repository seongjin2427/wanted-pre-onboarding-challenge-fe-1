import React from 'react';
import { Container } from '@mui/system';
import { Box } from '@mui/material';

const Home = () => {
  return (
    <Container
      component="div"
      sx={{
        width: '100%',
        height: '100%',
        margin: '0 auto',
        background: '#FFFFFF',
        border: 1,
        borderRadius: '15px',
      }}
    >
      <Box>
        메롱메롱
      </Box>
    </Container>
  );
};

export default Home;
