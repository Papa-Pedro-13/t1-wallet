export const isEmailValid = (email: string) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
};

export const isPasswordValid = (password: string) => {
  if (password.length > 32) {
    return 'Пароль слишком длинный';
  }
  return '';
};

export const submitRegisterForm = () => {};
