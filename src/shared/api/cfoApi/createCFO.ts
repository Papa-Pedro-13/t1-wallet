import toast from 'react-hot-toast';
import { instance } from '../../../app/ambient/axios.api';

export type createFromType = {
  owner: number;
  title: string;
  budget: number;
};

export const createCFO = async (form: createFromType) => {
  if (form.budget > 99999) {
    toast.error('Максимальный бюджет ЦФО 99999');
    return false;
  }
  for (const value of Object.values(form)) {
    if (value == 0) {
      toast.error('Заполните все поля');
      return false;
    }
  }
  try {
    await instance.post('/center/create', { ...form });
    toast.success('ЦФО создан');
  } catch {
    toast.error('ЦФО не создан');
    return false;
  }

  return true;
};
