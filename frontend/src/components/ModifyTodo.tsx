import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Input, Typography } from '@mui/material';
import { TodoType } from '../types/todo';
import { updateTodoApi } from '../api/todo';

interface ModifyTodoProps {
  id: string;
  todo: TodoType;
  modifiedTodo: TodoType;
  fetchTodo(): Promise<void>;
  changeModifyMode(b: boolean): void;
  copyModifiedTodo(todo: Pick<TodoType, 'title' | 'content'>): void;
}

const ModifyTodo = ({
  id,
  todo,
  modifiedTodo,
  fetchTodo,
  changeModifyMode,
  copyModifiedTodo,
}: ModifyTodoProps) => {
  const navigate = useNavigate();

  const cancelModifyMode = () => {
    changeModifyMode(false);
    navigate(`/?mode=detail&todo=${id}`);
  };

  const changeTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const next: TodoType = { ...todo };
    next[name] = value;
    copyModifiedTodo(next);
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

  return (
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
      <Input name="title" value={modifiedTodo.title} onChange={changeTodo} />
      <Typography variant="h6">할 일 내용</Typography>
      <Input
        name="content"
        value={modifiedTodo.content}
        onChange={changeTodo}
      />
    </>
  );
};

export default ModifyTodo;
