import { UserInfoType } from '../types/login';

const regexp: { [key: string]: RegExp } = {
  loginId: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  password: /^.{8,}$/,
};

const validateUserInfo = ({ loginId, password }: UserInfoType) => {
  return regexp.loginId.test(loginId) && regexp.password.test(password);
};

export { validateUserInfo };
