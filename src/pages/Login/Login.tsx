import React, { useEffect, useState } from 'react';
import styles from './Login.module.css';
import { Button, Input } from '../../shared/ui';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/store/store';
import { loginUser } from '../../features/user/model/userSlice';
import { isEmailValid, isPasswordValid } from '../../features/userForm/lib';
import toast from 'react-hot-toast';

export interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const dispatch = useAppDispatch();
  const { currentUser, isLoading } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const onSubmitHandle = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isEmailValid(form.email)) {
      toast.error('Введите правильный email');
      return;
    }
    if (isPasswordValid(form.password) !== '') {
      toast.error(isPasswordValid(form.password));
      return;
    }

    dispatch(loginUser({ ...form }));
  };

  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.block}>
      <div className={styles.container}>
        <h2 className={styles.headline}>Авторизация</h2>
        <form
          action=''
          method='post'
          className={styles.form}
        >
          <Input
            placeholder='Почта'
            name='email'
            value={form.email}
            onChange={onChangeHandle}
          />
          <Input
            placeholder='Пароль'
            type='password'
            name='password'
            value={form.password}
            onChange={onChangeHandle}
          />
          <Button
            disabled={isLoading}
            text='Войти в аккаунт'
            onClick={onSubmitHandle}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
