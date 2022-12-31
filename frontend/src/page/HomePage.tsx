import React from 'react';
import { Container } from '@mui/system';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemButton,
} from '@mui/material';
import AddTodo from '../components/AddTodo';
import { getTodosApi } from '../api/todo';
import { TodoType } from '../types/todo';

const Home = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [todos, setTodos] = React.useState<TodoType[]>([]);

  const mode = React.useMemo(() => {
    return search.split('?')[1].split('=')[1];
  }, [search]);

  const getTodos = React.useCallback(async () => {
    const { status, data } = await getTodosApi();
    if (status === 200) {
      setTodos(data);
    }
  }, []);

  const changeMode = (s: string) => {
    navigate(`/?type=${s}`);
  };

  React.useEffect(() => {
    getTodos();
  }, [getTodos, search]);

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
          <Button size="large" onClick={() => changeMode('add')}>
            <Typography variant="h1">+</Typography>
          </Button>
        </Box>
        <List>
          {todos.map((todo) => (
            <Todo key={todo.id} {...todo} />
          ))}
        </List>
      </Box>
      <Box flex="3" padding="30px 30px">
        {mode === 'add' && <AddTodo />}
      </Box>
    </Container>
  );
};

interface TodoProps {
  id?: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const Todo = ({ id, title, updatedAt }: TodoProps) => {
  const formatter = Intl.DateTimeFormat('ko-KR', {}).format;

  return (
    <ListItem sx={{ display: 'flex', alignItems: 'flex-start', padding: 0 }}>
      <ListItemButton sx={{ display: 'block' }}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="subtitle2">
          {updatedAt && formatter(new Date(updatedAt))}
        </Typography>
      </ListItemButton>
    </ListItem>
  );
};

export default Home;
