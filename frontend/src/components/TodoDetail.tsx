import React from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

import { TodoType } from '../types/todo';
import { parseQuery } from '../utils/parseQuery';
import { getTodoByIdApi } from '../api/todo';
import ReadTodo from './ReadTodo';
import ModifyTodo from './ModifyTodo';

const TodoDetail = () => {
  const { search } = useLocation();
  const [todo, setTodo] = React.useState<TodoType | null>(null);
  const [modifyMode, setModifyMode] = React.useState<boolean>(false);
  const [modifiedTodo, setModifiedTodo] = React.useState<TodoType>({
    title: '',
    content: '',
  });

  const id = React.useMemo(() => parseQuery(search).todo, [search]);

  const fetchTodo = React.useCallback(async () => {
    const { status, data } = await getTodoByIdApi(id);
    if (status === 200) {
      setTodo(data);
    }
  }, [id]);

  React.useEffect(() => {
    fetchTodo();
  }, [fetchTodo]);

  if (!todo) return null;

  const changeModifyMode = (b: boolean) => setModifyMode(b);
  const copyModifiedTodo = (s: Pick<TodoType, 'title' | 'content'>) =>
    setModifiedTodo(s);

  return (
    <Box>
      {modifyMode ? (
        <ModifyTodo
          id={id}
          todo={todo}
          modifiedTodo={modifiedTodo}
          fetchTodo={fetchTodo}
          changeModifyMode={changeModifyMode}
          copyModifiedTodo={copyModifiedTodo}
        />
      ) : (
        <ReadTodo
          todo={{ ...todo, id }}
          changeModifyMode={changeModifyMode}
          copyModifiedTodo={copyModifiedTodo}
        />
      )}
    </Box>
  );
};

export default TodoDetail;
