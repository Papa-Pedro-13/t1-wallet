import { useEffect, useState } from 'react';
import styles from './TransactionsTable.module.css';
import { DateRangePicker, Pagination } from 'rsuite';
// import { Transaction } from '../model/types';
import isAfter from 'date-fns/isAfter';
// import { UserRole } from '../../user/model/types/user';
import { useGetTransactionsQuery } from '../model/transactionsApiSlice';
import { useParams } from 'react-router-dom';

const TransactionsTable = () => {
  const { id } = useParams() as { id: string };
  const [period, setPeriod] = useState<[Date, Date] | null>(null);
  // const [filterByUser, setFilterByUser] = useState<number>(0);
  const [activePage, setActivePage] = useState(1);

  // const { usersList } = useAppSelector((state) => state.user);
  const pageSize = 2;
  const { data, isLoading } = useGetTransactionsQuery({
    id: +id,
    pageSize: pageSize,
    dateStart: period
      ? period[0].toLocaleDateString().replace('.', '-').replace('.', '-')
      : undefined,
    dateEnd: period
      ? period[1].toLocaleDateString().replace('.', '-').replace('.', '-')
      : undefined,
    // userId: filterByUser > 0 ? filterByUser : undefined,
    page: activePage > 0 ? activePage - 1 : undefined,
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

        {/* <Dropdown
          placeholder='Выбрать получателя'
          onSelect={(selectedOption) => setFilterByUser(selectedOption.id)}
          options={usersList}
          reload={false}
        /> */}
      </div>
      {isLoading ? (
        <h4 className={styles.info}>Загрузка...</h4>
      ) : data === undefined ? (
        <h4 className={styles.info}>Список пуст</h4>
      ) : (
        <>
          <div className={styles.table}>
            <div className={styles.header}>
              <div className={styles.cell}>Дата</div>
              <div className={styles.cell}>Сумма</div>
              <div className={styles.cell}>Получатель (ID)</div>
              <div className={styles.cell}>Комментарий</div>
            </div>
            {data?.data.map((transaction, index) => (
              <div
                key={index}
                className={styles.row}
              >
                <div className={styles.cell}>
                  {new Date(transaction.dateTime).toLocaleDateString()}
                </div>
                <div className={styles.cell}>{transaction.amount} ₽</div>
                <div className={styles.cell}>{transaction.recipient}</div>
                <div className={styles.cell}>{transaction.comment}</div>
              </div>
            ))}
          </div>
          <div className={styles.pagination}>
            <Pagination
              prev
              next
              size='sm'
              total={data.total}
              limit={pageSize}
              activePage={activePage}
              onChangePage={setActivePage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionsTable;
