import { useState } from 'react';
import styles from './CFOCreate.module.css';
import { Button, Dropdown, Input } from '../../../shared/ui';

import {
  createCFO,
  createFromType,
} from '../../../shared/api/cfoApi/createCFO';
import { useAppSelector } from '../../../app/store/store';

const initFormCreateCFO: createFromType = {
  owner: 0,
  title: '',
  budget: 0,
};
const CFOCreate = () => {
  const [dropdownReload, setDropdownReload] = useState(false);
  const [form, setForm] = useState(initFormCreateCFO);

  const { usersList, currentUser } = useAppSelector((state) => state.user);

  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setForm({ ...form, [e.target.name]: newValue });
  };
  const budgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // Проверяем, чтобы ввод состоял только из цифр или пустой строки (для удаления значения)
    if (/^\d*$/.test(newValue)) {
      // Если строка не пустая, обновляем значение в числовом формате
      if (newValue !== '') {
        setForm((prev) => {
          return { ...prev, [e.target.name]: +newValue };
        });
      } else {
        setForm((prev) => {
          return { ...prev, [e.target.name]: 0 };
        });
      }
    }
  };
  const onSubmitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await createCFO(form);
    if (res) {
      setForm(initFormCreateCFO);
      setDropdownReload(!dropdownReload);
    }
  };

  return (
    <div className={styles.block}>
      <h3 className={styles.headline}>Создание ЦФО</h3>
      <form
        action=''
        onSubmit={onSubmitHandle}
        className={styles.form}
      >
        <Input
          placeholder='Название ЦФО'
          value={form.title}
          name='title'
          // {...register('title')}
          onChange={onChangeHandle}
        />
        {/* <CustomInput
          placeholder='Название ЦФО'
          {...register('title')}
        /> */}
        <Input
          placeholder='Бюджет ЦФО'
          name='budget'
          onChange={budgetChange}
          value={form.budget.toString()}
        />
        <Dropdown
          onSelect={(selectedOption) => {
            setForm({ ...form, owner: selectedOption.id });
          }}
          reload={dropdownReload}
          placeholder='Владелец бюджета'
          options={usersList.filter((user) => user.id !== currentUser?.id)}
        />
        <Button
          text='Создать'
          type='submit'
        />
      </form>
    </div>
  );
};

export default CFOCreate;
