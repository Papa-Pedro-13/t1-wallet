import toast from 'react-hot-toast';
import { instance } from '../../../app/ambient/axios.api';
import { CFO } from '../../../features/cfoList/model/types';

export const changeBudget = async (
  newBudget: number,
  data: CFO | undefined
) => {
  if (data === undefined) {
    toast.error('Бюджет не изменился');
    return Promise.reject('Бюджет не изменился');
  }

  const transactionType = data.budget - newBudget < 0 ? 'DEPOSIT' : 'WITHDRAW';

  try {
    await instance.post(`center/${data.id}/edit-budget`, {
      // id: data.id,
      amount: Math.abs(data.budget - newBudget),
      transactionType: transactionType,
      comment: 'Изменён бюджет ЦФО',
    });
    toast.success('Бюджет изменён');
  } catch (error) {
    toast.error('Бюджет не изменился');
    throw error;
  }
};
