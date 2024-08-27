import CFOOperationsDetails from '../../features/cfoDetails/ui/CFOOperationsDetails';
import { CFOReport } from '../../features/cfoDetails/model/CFOReport';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
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
  const report: CFOReport = {
    cfoName: 'ЦФО Москва',
    balance: 200000,
    balanceDate: '2024-08-17',
    transactions: transactionsList,
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={'de'}
    >
      <CFOOperationsDetails
        report={report}
        startDate={''}
        endDate={''}
      />
    </LocalizationProvider>
  );
};

export default CFODetails;
