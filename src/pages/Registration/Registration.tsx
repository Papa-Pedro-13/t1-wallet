import React, { useState } from 'react';
import styles from './Registration.module.css';
import { Button } from '../../shared/ui';
import Input from '../../shared/ui/Input/Input';
import { Link } from 'react-router-dom';
import { isEmailValid, isPasswordValid } from '../../features/userForm/lib';
import toast from 'react-hot-toast';

interface RegistrationForm {
  name: string;
  surname: string;
  email: string;
  password: string;
}

const initForm = {
  name: '',
  surname: '',
  email: '',
  password: '',
};

const Registration = () => {
  const [form, setForm] = useState<RegistrationForm>(initForm);

  const onSubmitHandle = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isEmailValid(form.email)) {
      toast.error('Введите правильный email');
      return;
    }
    if (isPasswordValid(form.password) !== '') {
      toast.error(isPasswordValid(form.password));
      return;
    }

    fetch('www.google.com', {
      method: 'POST',
      body: JSON.stringify(form),
    })
      .then(() => {
        setForm(initForm);
      })
      .catch(() => toast.error('Что-то пошло не так! Повторите попытку'));
  };
  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.block}>
      <div className={styles.container}>
        <h2 className={styles.headline}>Создание аккаунта</h2>
        <form
          action=''
          method='post'
          className={styles.form}
        >
          <Input
            placeholder='Имя'
            name='name'
            value={form.name}
            onChange={onChangeHandle}
          />
          <Input
            placeholder='Фамилия'
            name='surname'
            value={form.surname}
            onChange={onChangeHandle}
          />
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
            type='submit'
            text='Создать аккаунт'
            onClick={onSubmitHandle}
          />
        </form>
        <p className={styles.paragraph}>
          Уже есть аккаунт?
          <Link
            to={'/login'}
            className={styles.link}
          >
            {' '}
            Войдите в него!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
