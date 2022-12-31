import React, { PropsWithChildren } from 'react';
import { Container } from '@mui/material';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Container
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Container>
  );
};

export default MainLayout;
