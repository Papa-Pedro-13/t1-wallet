import CFOOperationsDetails from '../../features/cfoDetails/ui/CFOOperationsDetails';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useAppSelector } from '../../app/store/store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { UserRole } from '../../features/user/model/types/user';
// import { useAppDispatch } from '../../app/store/store';
// import { getCFOList } from '../../features/cfoList/model/cfoSlice';
// import { useEffect } from 'react';

export const transactionsList = [
  {
    date: '2024-08-10',
    amount: 50000,
    senderCFOId: '001',
    senderCFOName: 'ЦФО Санкт-Петербург',
    receiverCFOId: '002',
    receiverCFOName: 'ЦФО Москва',
    comment: 'Перевод средств для проекта A',
  },
  {
    date: '2024-08-15',
    amount: 25000,
    senderCFOId: '003',
    senderCFOName: 'ЦФО Казань',
    receiverCFOId: '002',
    receiverCFOName: 'ЦФО Москва',
    comment: 'Оплата поставки',
  },
];
const CFODetails = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.userRole === UserRole.user) navigate('/');
  }, [currentUser?.userRole, navigate]);

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={'de'}
    >
      <CFOOperationsDetails />
    </LocalizationProvider>
  );
};

export default CFODetails;
