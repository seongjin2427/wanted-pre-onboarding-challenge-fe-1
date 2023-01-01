const validateStatus = (status: number, url: string) => {
  if (status === 200) return url;
  if (status === 400) {
    alert('로그인이 필요합니다.');
    return '/auth';
  }
  return '/';
};

export { validateStatus };
