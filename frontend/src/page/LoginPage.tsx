import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Tabs, Tab, Typography, TextField, Button } from '@mui/material';

import { UserInfoType } from '../types/login';
import { loginApi, signUpApi } from '../api/auth';
import { validateUserInfo } from '../utils/validate';

const LoginPage = () => {
  const navigate = useNavigate();
  const [tab, setTabs] = React.useState(0);
  const [valid, setValid] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState<UserInfoType>({
    loginId: '',
    password: '',
  });

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const result =
      tab === 0 ? await loginApi(userInfo) : await signUpApi(userInfo);

    if (result === 200) {
      navigate('/');
    }
  };
  const tabChangeHandler = (e: any, newValue: number) => {
    setUserInfo({ loginId: '', password: '' });
    setTabs(newValue);
  };

  const userInfoChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const next: UserInfoType = { ...userInfo };
    next[name] = value;
    setValid(validateUserInfo(next));
    setUserInfo(next);
  };

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/');
  }, [navigate]);

  return (
    <Box
      sx={{
        width: '500px',
        margin: '0 auto',
        background: '#FFFFFF',
        border: 1,
        borderRadius: '15px',
        boxShadow: '10px 10px 10px #dddddd',
      }}
    >
      <Box marginBottom={2}>
        <Tabs value={tab} variant="fullWidth" onChange={tabChangeHandler}>
          <Tab label="로그인" value={0} />
          <Tab label="회원가입" value={1} />
        </Tabs>
      </Box>
      <Box padding="15px 40px 50px 50px">
        <form onSubmit={submitHandler}>
          <Typography variant="h1" marginBottom={1}>
            {tab === 0 ? '로그인' : '회원가입'}
          </Typography>
          <TextField
            label="LOGIN ID (EMAIL)"
            name="loginId"
            margin="dense"
            onChange={userInfoChangeHandler}
            value={userInfo.loginId}
            fullWidth
          />
          <TextField
            type="password"
            label="PASSWORD"
            name="password"
            sx={{ margin: '10px 0 20px 0' }}
            onChange={userInfoChangeHandler}
            value={userInfo.password}
            fullWidth
          />

          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            disabled={!valid}
            fullWidth
          >
            {tab === 0 ? 'LOGIN' : 'SIGN UP'}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;
