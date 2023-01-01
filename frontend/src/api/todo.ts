import axios, { AxiosError } from 'axios';
import { TodoType } from '../types/todo';

const addTodoApi = async ({ title, content }: TodoType) => {
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
    return { status, data: data.data };
  } catch (err) {
    const error = err as AxiosError;
    return { status: error.response?.status, data: [] };
  }
};

const getTodoByIdApi = async (id: string) => {
  try {
    const { status, data } = await axios.get<{ data: TodoType }>(
      `http://localhost:8080/todos/${id}`,
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
    );

    return { status, data: data.data };
  } catch (err) {
    const error = err as AxiosError;
    return { status: error.response?.status, data: null };
  }
};

const updateTodoApi = async ({ id, title, content }: TodoType) => {
  try {
    const { status } = await axios.put(
      `http://localhost:8080/todos/${id}`,
      { title, content },
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

const removeTodoApi = async (id: string) => {
  try {
    const { status } = await axios.delete(`http://localhost:8080/todos/${id}`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });

    return status;
  } catch (err) {
    const error = err as AxiosError;
    return error.response?.status;
  }
};

export {
  addTodoApi,
  getTodosApi,
  getTodoByIdApi,
  updateTodoApi,
  removeTodoApi,
};
