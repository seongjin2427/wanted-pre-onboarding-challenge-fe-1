import React from 'react';
import { Box, Button, Input, InputLabel, Typography } from '@mui/material';
import { addTodoApi } from '../api/todo';
import { useNavigate } from 'react-router-dom';

const AddTodo = () => {
  const navigate = useNavigate();
  const titleRef = React.useRef<HTMLInputElement>(null);
  const contentRef = React.useRef<HTMLInputElement>(null);

  const onClickAddTodo = async () => {
    const title = titleRef.current?.value;
    const content = contentRef.current?.value;

    if (title && content) {
      const status = await addTodoApi({ title, content });
      if (status === 200) {
        alert('정상적으로 등록되었습니다.');
        navigate('/');
      }
    }
  };

  return (
    <Box>
      <Typography variant="h1" marginBottom="1rem">
        AddTodo
      </Typography>
      <InputLabel htmlFor="todo-title">제목</InputLabel>
      <Input
        id="todo-title"
        inputRef={titleRef}
        fullWidth
        sx={{ marginBottom: '1rem' }}
      />
      <InputLabel htmlFor="todo-content">내용</InputLabel>
      <Input
        id="todo-content"
        inputRef={contentRef}
        fullWidth
        sx={{ marginBottom: '1rem' }}
      />
      <Box width="100%" display="flex" justifyContent="flex-end">
        <Button variant="contained" onClick={onClickAddTodo}>
          할 일 추가
        </Button>
      </Box>
    </Box>
  );
};

export default AddTodo;
