import axios, { AxiosError } from 'axios';
import { TodoType } from '../types/todo';

const addTodoApi = async ({ title, content }: TodoType) => {
  console.log(title, content);
  try {
    const { status } = await axios.post(
      'http://localhost:8080/todos',
      {
        title,
        content,
      },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
    );

    return status;
  } catch (err) {
    const error = err as AxiosError;
    return error.response?.status;
  }
};

const getTodosApi = async () => {
  try {
    const { status, data } = await axios.get<{ data: TodoType[] }>(
      'http://localhost:8080/todos',
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
    );

    console.log(data);

    return { status, data: data.data };
  } catch (err) {
    const error = err as AxiosError;
    return { status: error.response?.status, data: [] };
  }
};

export { addTodoApi, getTodosApi };
