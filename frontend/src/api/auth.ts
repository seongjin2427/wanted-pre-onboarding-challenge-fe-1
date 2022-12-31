import axios, { AxiosError } from 'axios';

interface UserInfoType {
  loginId: string;
  password: string;
}

interface SignUpResponse {
  message: string;
  token: string;
}

const signUpApi = async ({ loginId, password }: UserInfoType) => {
  try {
    const { status, data } = await axios.post<SignUpResponse>(
      'http://localhost:8080/users/create',
      {
        email: loginId,
        password,
      },
    );

    alert(data.message);
    localStorage.setItem('token', data.token);

    return status;
  } catch (err) {
    const error = err as AxiosError<{
      details: string;
    }>;
    alert(error.response?.data.details);
    return error.response?.status;
  }
};

const loginApi = async ({ loginId, password }: UserInfoType) => {
  try {
    const { status, data } = await axios.post<SignUpResponse>(
      'http://localhost:8080/users/login',
      {
        email: loginId,
        password,
      },
    );

    alert(data.message);
    localStorage.setItem('token', data.token);

    return status;
  } catch (err) {
    const error = err as AxiosError<{
      details: string;
    }>;
    alert(error.response?.data.details);
    return error.response?.status;
  }
};

export { signUpApi, loginApi };
