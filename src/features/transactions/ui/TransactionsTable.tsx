import { useEffect, useState } from 'react';
import styles from './TransactionsTable.module.css';
import { DateRangePicker, Pagination } from 'rsuite';
// import { Transaction } from '../model/types';
import isAfter from 'date-fns/isAfter';
// import { UserRole } from '../../user/model/types/user';
import { useAppSelector } from '../../../app/store/store';
import { useGetTransactionsQuery } from '../model/transactionsApiSlice';
import { useParams } from 'react-router-dom';
import { Dropdown } from '../../../shared/ui';

// const mocks: Transaction[] = [
//   {
//     id: 1,
//     nameOfOperation: 'Payment',
//     comment: 'Payment for monthly subscription',
//     dateTime: new Date('2024-08-01T10:00:00Z'),
//     amount: 99.99,
//     from: 'John Doe',
//     to: 'Service Provider Inc.',
//     recipientType: UserRole.admin,
//   },
//   {
//     id: 2,
//     nameOfOperation: 'Refund',
//     comment: 'Refund for defective product',
//     dateTime: new Date('2024-08-02T15:30:00Z'),
//     amount: -25.5,
//     from: 'Jane Smith',
//     to: 'Retailer Ltd.',
//     recipientType: UserRole.admin,
//   },
//   {
//     id: 3,
//     nameOfOperation: 'Transfer',
//     comment: 'Transfer between accounts',
//     dateTime: new Date('2024-08-03T12:45:00Z'),
//     amount: 200.0,
//     from: 'Alice Johnson',
//     to: 'Savings Account',
//     recipientType: UserRole.admin,
//   },
//   {
//     id: 4,
//     nameOfOperation: 'Withdrawal',
//     comment: 'ATM withdrawal',
//     dateTime: new Date('2024-08-04T08:00:00Z'),
//     amount: -100.0,
//     from: 'Bob Brown',
//     to: 'ATM Location',
//     recipientType: UserRole.admin,
//   },
// ];

const TransactionsTable = () => {
  const { id } = useParams() as { id: string };
  const [period, setPeriod] = useState<[Date, Date] | null>(null);
  const [filterByUser, setFilterByUser] = useState<number>(0);
  const [activePage, setActivePage] = useState(1);
  //Мокаем
  // const [filteredTransactions, setFilteredTransactions] =
  //   useState<Transaction[]>(mocks);
  const { usersList } = useAppSelector((state) => state.user);

  const { data, isLoading } = useGetTransactionsQuery({
    id: +id,
    dateStart: period ? period[0].toISOString() : undefined,
    dateEnd: period ? period[1].toISOString() : undefined,
    userId: filterByUser > 0 ? filterByUser : undefined,
    page: activePage > 0 ? activePage : undefined,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className={styles.transactions}>
      <h3>Транзакции за период</h3>

      <div className={styles.filters}>
        <DateRangePicker
          value={period}
          onChange={(date) => setPeriod(date)}
          format='dd.MM.yyyy'
          shouldDisableDate={(date) => isAfter(date, new Date())}
          placeholder='Выберите дату'
          showHeader={false}
          style={{ width: 300 }}
        />

        <Dropdown
          placeholder='Владелец бюджета'
          onSelect={(selectedOption) => setFilterByUser(selectedOption.id)}
          options={usersList}
          reload={false}
        />
      </div>
      <div className={styles.table}>
        <div className={styles.header}>
          <div className={styles.cell}>Дата</div>
          <div className={styles.cell}>Сумма</div>
          <div className={styles.cell}>Отправитель (ID)</div>
          <div className={styles.cell}>Получатель (ID)</div>
          <div className={styles.cell}>Комментарий</div>
        </div>
        {isLoading ? (
          <h4 className={styles.info}>Загрузка...</h4>
        ) : data?.length === 0 || data === undefined ? (
          <h4 className={styles.info}>Список пуст</h4>
        ) : (
          data.map((transaction, index) => (
            <div
              key={index}
              className={styles.row}
            >
              <div className={styles.cell}>
                {transaction.dateTime.toLocaleDateString()}
              </div>
              <div className={styles.cell}>{transaction.amount} ₽</div>
              <div className={styles.cell}>{transaction.from}</div>
              <div className={styles.cell}>{transaction.to}</div>
              <div className={styles.cell}>{transaction.comment}</div>
            </div>
          ))
        )}
      </div>

      <div className={styles.pagination}>
        <Pagination
          prev
          next
          size='sm'
          total={100}
          limit={20}
          activePage={activePage}
          onChangePage={setActivePage}
        />
      </div>
    </div>
  );
};

export default TransactionsTable;
