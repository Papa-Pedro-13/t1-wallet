import toast from 'react-hot-toast';
import { instance } from '../../../app/ambient/axios.api';
import {
  TransferFromCFO,
  TransferUserToUser,
} from '../../../features/moneyTransfer/model/types';

export const TransferCoinsFromUser = async (
  e: React.FormEvent<HTMLFormElement>,
  form: TransferUserToUser
) => {
  e.preventDefault();
  const { userId, ...editForm } = form;
  try {
    await instance.post(`/user/transfer/${userId}`, editForm);
    toast.success('Перевод совершён!');
  } catch {
    toast.error('Перевод не удался!');
  }
};
export const TransferCoinsFromCFO = async (
  e: React.FormEvent<HTMLFormElement>,
  centerId: string,
  form: TransferFromCFO
) => {
  e.preventDefault();

  try {
    await instance.post(`/center/${centerId}/transfer/`, form);
    toast.success('Перевод совершён!');
  } catch {
    toast.error('Перевод не удался!');
  }
};
