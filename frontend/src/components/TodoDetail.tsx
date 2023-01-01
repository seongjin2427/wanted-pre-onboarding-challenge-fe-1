import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Input } from '@mui/material';
import { getTodoByIdApi, removeTodoApi, updateTodoApi } from '../api/todo';
import { TodoType } from '../types/todo';

interface TodoDetailProps {
  id: string;
}

const TodoDetail = ({ id }: TodoDetailProps) => {
  const navigate = useNavigate();
  const [todo, setTodo] = React.useState<TodoType | null>(null);
  const [modifyMode, setModifyMode] = React.useState<boolean>(false);
  const [modifiedTodo, setModifiedTodo] = React.useState<TodoType>({
    title: '',
    content: '',
  });
  const formatter = Intl.DateTimeFormat('ko-KR', {}).format;

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
  const { title, content, createdAt, updatedAt } = todo;

  const onModifyMode = () => {
    setModifiedTodo(todo);
    setModifyMode(true);
    navigate('/?mode=modify');
  };

  const cancelModifyMode = () => {
    setModifyMode(false);
    navigate('/?mode=detail');
  };

  const changeTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const next: TodoType = { ...todo };
    next[name] = value;
    setModifiedTodo(next);
  };

  const updateTodo = async () => {
    const status = await updateTodoApi({
      id,
      title: modifiedTodo.title,
      content: modifiedTodo.content,
    });

    if (status === 200) {
      cancelModifyMode();
      fetchTodo();
    }
  };

  const removeTodo = async () => {
    const status = await removeTodoApi(id);
    if (status === 200) {
      alert('정상적으로 삭제되었습니다.');
      navigate('/');
    }
  };

  return (
    <Box>
      {modifyMode ? (
        <>
          <Box display="flex" gap="1rem" marginBottom="1rem">
            <Button variant="contained" onClick={updateTodo}>
              확인
            </Button>
            <Button variant="contained" color="info" onClick={cancelModifyMode}>
              취소
            </Button>
          </Box>
          <Typography variant="h6">할 일 제목</Typography>
          <Input
            name="title"
            value={modifiedTodo.title}
            onChange={changeTodo}
          />
          <Typography variant="h6">할 일 내용</Typography>
          <Input
            name="content"
            value={modifiedTodo.content}
            onChange={changeTodo}
          />
        </>
      ) : (
        <>
          <Box display="flex" gap="1rem" marginBottom="1rem">
            <Button variant="contained" onClick={onModifyMode}>
              수정
            </Button>
            <Button variant="contained" color="error" onClick={removeTodo}>
              삭제
            </Button>
          </Box>
          <Typography variant="h6">할 일 제목</Typography>
          <Typography>{title}</Typography>
          <Typography variant="h6">할 일 내용</Typography>
          <Typography>{content}</Typography>
          <Typography variant="h6">등록일</Typography>
          <Typography>{createdAt && formatter(new Date(createdAt))}</Typography>
          <Typography variant="h6">수정일</Typography>
          <Typography>{updatedAt && formatter(new Date(updatedAt))}</Typography>
        </>
      )}
    </Box>
  );
};

export default TodoDetail;
