import React from 'react';
import { Container } from '@mui/system';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Button, List } from '@mui/material';

import Todo from '../components/Todo';
import AddTodo from '../components/AddTodo';
import TodoDetail from '../components/TodoDetail';
import { TodoType } from '../types/todo';
import { parseQuery } from '../utils/parseQuery';
import { getTodosApi } from '../api/todo';
import { validateStatus } from '../utils/validateStatus';

const Home = () => {
  const navigate = useNavigate();
  const { search, pathname } = useLocation();
  const [todos, setTodos] = React.useState<TodoType[]>([]);

  const { mode, todo } = React.useMemo(() => {
    return parseQuery(search);
  }, [search]);

  const getTodos = React.useCallback(async () => {
    const { status, data } = await getTodosApi();

    if (status) {
      navigate(validateStatus(status, pathname + search));
    }

    if (status === 200) {
      setTodos(data);
    }
  }, [pathname, search, navigate]);

  const changeMode = (s: string) => {
    navigate(`/?mode=${s}`);
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
          {todos.map((td) => (
            <Todo key={td.id} active={td.id === todo} {...td} />
          ))}
        </List>
      </Box>
      <Box flex="3" padding="30px 30px">
        {mode === 'add' && <AddTodo />}
        {(mode === 'detail' || mode === 'modify') && <TodoDetail />}
      </Box>
    </Container>
  );
};

export default Home;
