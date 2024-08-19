import React, { useState } from 'react';
import styles from './Login.module.css';
import { Button } from '../../shared/ui';
import Input from '../../shared/ui/Input/Input';
import { Link } from 'react-router-dom';

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });

  const onSubmitHandle = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
            text='Войти в аккаунт'
            onClick={onSubmitHandle}
          />
        </form>
        <p className={styles.paragraph}>
          Если у вас еще нет аккаунта
          <Link
            to={'/register'}
            className={styles.link}
          >
            {' '}
            создайте новый!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
