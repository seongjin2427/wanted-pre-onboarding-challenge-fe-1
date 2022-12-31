import axios, { AxiosError } from 'axios';
interface TodoType {
  id?: string;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

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

export { addTodoApi };
