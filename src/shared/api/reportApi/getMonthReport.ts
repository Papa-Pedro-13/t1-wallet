import toast from 'react-hot-toast';
import { instance } from '../../../app/ambient/axios.api';
import { DayReport } from '../../../features/dashboard/model/types';

export const getMonthReport = async (
  year: number,
  month: number
): Promise<DayReport[]> => {
  try {
    const response = await instance.get<DayReport[]>(
      `/report/?year=${year}&month=${month}`
    );
    return response.data;
  } catch {
    toast.error('Данные не получены!');
    return [];
  }
};
export const updateCurrentReport = async (): Promise<string> => {
  try {
    const response = await instance.post(`/report/generate`);
    return response.data;
  } catch {
    return '';
  }
};
