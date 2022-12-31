import React from 'react';
import { Container } from '@mui/system';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemButton,
} from '@mui/material';
import AddTodo from '../components/AddTodo';

const Home = () => {
  return (
    <Container
      component="div"
      sx={{
        display: 'flex',
        width: '100%',
        height: '90%',
        margin: '0 auto',
        background: '#FFFFFF',
        border: 1,
        borderRadius: '15px',
        boxShadow: '10px 10px 10px #dddddd',
      }}
    >
      <Box flex="1" padding="30px 30px 30px 10px" borderRight={1}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginBottom="20px"
        >
          <Typography variant="h1">TodoList</Typography>
          <Button size="large">
            <Typography variant="h1">+</Typography>
          </Button>
        </Box>
        <List>
          <Todo
            id="1"
            title="테스트"
            createdAt="2023-01-01"
            updatedAt="2023-01-01"
          />
          <Todo
            id="1"
            title="테스트"
            createdAt="2023-01-01"
            updatedAt="2023-01-01"
          />
        </List>
      </Box>
      <Box flex="3" padding="30px 30px">
        <AddTodo />
      </Box>
    </Container>
  );
};

interface TodoProps {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

const Todo = ({ id, title, updatedAt }: TodoProps) => {
  return (
    <ListItem sx={{ display: 'flex', alignItems: 'flex-start', padding: 0 }}>
      <ListItemButton sx={{ display: 'block' }}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="subtitle2">{updatedAt}</Typography>
      </ListItemButton>
    </ListItem>
  );
};

export default Home;
