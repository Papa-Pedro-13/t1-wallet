import toast from 'react-hot-toast';
import { instance } from '../../../app/ambient/axios.api';

export type createFromType = {
  owner: number;
  title: string;
  budget: number;
};

export const createCFO = async (form: createFromType) => {
  for (const value of Object.values(form)) {
    if (value == 0) {
      toast.error('Заполните все поля');
      return false;
    }
  }
  try {
    const response = await instance.post('/center/create', { ...form });
    console.log(response);
    toast.success('ЦФО создан');
  } catch {
    toast.error('ЦФО не создан');
  }

  return true;
};
