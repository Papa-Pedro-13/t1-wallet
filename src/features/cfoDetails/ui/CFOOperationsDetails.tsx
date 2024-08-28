import React, { useEffect, useState } from 'react';
import styles from './CFOOperationsDetails.module.css';
import 'dayjs/locale/de';
import { DatePicker, DateRangePicker } from 'rsuite';
import { CFOReport, Transaction } from '../model/CFOReport';
import { useNavigate, useParams } from 'react-router';
import { transactionsList } from '../../../pages/CFODetails/CFODetails';
import { TransferForm } from '../../moneyTransfer';
import { useAppSelector } from '../../../app/store/store';
import ChangeBudget from './ChangeBudget';
import { BASE_URL } from '../../../app/ambient/constants';
import { useGetCFOQuery } from '../model/cfoApi';

interface CFOOperationsDetailsProps {
  report: CFOReport;
  startDate: string;
  endDate: string;
}

const CFOOperationsDetails: React.FC<CFOOperationsDetailsProps> = ({
  report,
}) => {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state);
  const [transactions, setTransactions] =
    useState<Transaction[]>(transactionsList);
  const [period, setPeriod] = useState<[Date, Date] | null>(null);
  const navigate = useNavigate();

  const { data, isFetching, isSuccess, isLoading } = useGetCFOQuery({ id });

  useEffect(() => {
    if (!isFetching && !isLoading && !isSuccess) {
      navigate('/');
    }
  }, [isFetching, isLoading, isSuccess, navigate]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  // useEffect(() => {
  //   if (period === null) return;
  //   fetch(
  //     `/get-history-of-center/${id}?dateFrom=${period[0]}&dateTo=${period[1]}`
  //   )
  //     .then((value) => {
  //       return value.json();
  //     })
  //     .then((res: Transaction[]) => setTransactions(res));
  // }, [period, id]);

  return (
    <div className={styles.container}>
      <h2 className={styles.mainHeadline}>{report.cfoName}</h2>

      <ChangeBudget />

      {/* Need */}
      {/* {user.currentUser?.id === '1' && ( */}
      <TransferForm
        url={`${BASE_URL}/`}
        from='ЦФО name'
        max={data.budget}
        headline='Начислить пользователю коины'
      />
      {/* )} */}

      <div className={styles.transactions}>
        <h3>Транзакции за период</h3>

        <DateRangePicker
          value={period}
          onChange={(date) => setPeriod(date)}
          format='dd.MM.yyyy'
          placeholder='Выберите дату'
          showHeader={false}
          style={{ width: 300 }}
        />

        <div className={styles.table}>
          <div className={styles.header}>
            <div className={styles.cell}>Дата</div>
            <div className={styles.cell}>Сумма</div>
            <div className={styles.cell}>Отправитель (ID)</div>
            <div className={styles.cell}>Получатель (ID)</div>
            <div className={styles.cell}>Комментарий</div>
          </div>
          {transactions.map((transaction, index) => (
            <div
              key={index}
              className={styles.row}
            >
              <div className={styles.cell}>{transaction.date}</div>
              <div className={styles.cell}>{transaction.amount} ₽</div>
              <div className={styles.cell}>
                {transaction.senderCFOName} ({transaction.senderCFOId})
              </div>
              <div className={styles.cell}>
                {transaction.receiverCFOName} ({transaction.receiverCFOId})
              </div>
              <div className={styles.cell}>{transaction.comment}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CFOOperationsDetails;
