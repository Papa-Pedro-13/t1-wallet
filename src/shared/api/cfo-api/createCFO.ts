import axios from 'axios';
import toast from 'react-hot-toast';
import { BASE_URL } from '../../../app/ambient/constants';
// import { handlingRequestError } from '../index';

export type createFromType = {
  owner: string;
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
    const response = await axios.post(`${BASE_URL}/center/create`, { ...form });
    console.log(response);
  } catch {
    console.log('error');
    // handlingRequestError(err);
  }

  return true;
  // console.log(form);
};
