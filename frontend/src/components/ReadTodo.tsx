import React from 'react';
import { Box, Button, Typography } from '@mui/material';

import { TodoType } from '../types/todo';
import { useNavigate } from 'react-router-dom';
import { removeTodoApi } from '../api/todo';

interface ReadTodoProps {
  todo: TodoType & { id: string };
  changeModifyMode(b: boolean): void;
  copyModifiedTodo(todo: Pick<TodoType, 'title' | 'content'>): void;
}

const ReadTodo = ({
  todo,
  changeModifyMode,
  copyModifiedTodo,
}: ReadTodoProps) => {
  const navigate = useNavigate();
  const { id, title, content, createdAt, updatedAt } = todo;
  const formatter = Intl.DateTimeFormat('ko-KR', {}).format;

  const onModifyMode = () => {
    copyModifiedTodo(todo);
    changeModifyMode(true);
    navigate(`/?mode=modify&todo=${id}`);
  };

  const removeTodo = async () => {
    const status = await removeTodoApi(id);
    if (status === 200) {
      alert('정상적으로 삭제되었습니다.');
      navigate('/');
    }
  };

  return (
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
  );
};

export default ReadTodo;
