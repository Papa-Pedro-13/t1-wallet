import React, { useState } from 'react';
import styles from './CFOOperationsDetails.module.css';
import 'dayjs/locale/de';
import { DateRangePicker } from 'rsuite';
import { CFOReport } from '../model/CFOReport';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

interface CFOOperationsDetailsProps {
  report: CFOReport;
  startDate: string;
  endDate: string;
}

const CFOOperationsDetails: React.FC<CFOOperationsDetailsProps> = ({
  report,
}) => {
  const [balanceDate, setBalanceDate] = useState<Dayjs | null>(
    dayjs(new Date())
  );
  const [period, setPeriod] = useState<[Date, Date] | null>([
    new Date(),
    new Date(),
  ]);

  // useEffect(() => {
  //   console.log(balanceDate?.toDate().toLocaleDateString());
  // }, [balanceDate]);

  return (
    <div className={styles.container}>
      <h2>{report.cfoName}</h2>

      <div className={styles.balanceInfo}>
        <h3 className={styles.headline}>
          Остаток на счете на
          {/* <DemoContainer components={['DatePicker']}> */}
          <DatePicker
            label='Выберите дату'
            value={balanceDate}
            onChange={(newValue) => setBalanceDate(newValue)}
          />
          {/* </DemoContainer> */}:
        </h3>
        {/* <p className={styles.prop}>
          Дата: <span>{balanceDate.toLocaleDateString()}</span> 
        </p> */}

        <p className={styles.balance}>20000 ₽</p>
      </div>

      <div className={styles.transactions}>
        <h3>Транзакции за период</h3>

        <DateRangePicker
          value={period}
          onChange={(date) => setPeriod(date)}
          format='dd.MM.yyyy'
          showHeader={false}
        />

        <div className={styles.table}>
          <div className={styles.header}>
            <div className={styles.cell}>Дата</div>
            <div className={styles.cell}>Сумма</div>
            <div className={styles.cell}>Отправитель (ID)</div>
            <div className={styles.cell}>Получатель (ID)</div>
            <div className={styles.cell}>Комментарий</div>
          </div>
          {report.transactions.map((transaction, index) => (
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
