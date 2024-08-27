import { useState } from 'react';
import styles from './CFOCreate.module.css';
import Dropdown from '../../../shared/ui/Dropdown/Dropdown';

import Input from '../../../shared/ui/Input/Input';
import { Button } from '../../../shared/ui';
import toast from 'react-hot-toast';

const CFOCreate = () => {
  const initForm = {
    owner: '',
    name: '',
    budget: 0,
  };
  const [dropdownReload, setDropdownReload] = useState(false);
  const [form, setForm] = useState(initForm);

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
  const onSubmitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    for (const value of Object.values(form)) {
      if (value == 0) {
        toast.error('Заполните все поля');
        return;
      }
    }

    //Need

    //
    setForm(initForm);
    setDropdownReload(!dropdownReload);
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
          name='name'
          value={form.name}
          onChange={onChangeHandle}
        />
        <Input
          placeholder='Бюджет ЦФО'
          name='budget'
          onChange={budgetChange}
          value={form.budget.toString()}
        />
        <Dropdown
          onSelect={(selectedOption) => {
            setForm({ ...form, owner: selectedOption });
          }}
          reload={dropdownReload}
          placeholder='Владелец бюджета'
          options={['Вася', 'Коля', 'Маша', 'Петя']}
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
