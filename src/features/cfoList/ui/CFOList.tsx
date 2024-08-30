import { useEffect, useState } from 'react';
import styles from './CFOList.module.css';
import { Link } from 'react-router-dom';
import { useGetCFOListApiQuery } from '../../cfoDetails/model/cfoApiSlice';
import { CFO } from '../model/types';
import { Pagination } from 'rsuite';

type SortColumn = 'name' | 'initialBudget' | 'remainingBudget';
type SortOrder = 'asc' | 'desc';

const CFOList = () => {
  const { data, isLoading } = useGetCFOListApiQuery();
  const [activePage, setActivePage] = useState(1);
  const [sortedData, setSortedData] = useState<CFO[]>([]);
  const [sortColumn, setSortColumn] = useState<SortColumn>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const sortData = (column: SortColumn) => {
    const newSortOrder =
      sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';

    const sorted = [...sortedData].sort((a, b) => {
      if (column === 'name') {
        return newSortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else {
        return newSortOrder === 'asc'
          ? a.budget - b.budget
          : b.budget - a.budget;
      }
    });

    setSortColumn(column);
    setSortOrder(newSortOrder);
    setSortedData(sorted);
  };
  const pageSize = 20;
  const startIndex = (activePage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedData = sortedData.slice(startIndex, endIndex);

  useEffect(() => {
    if (!data) return;

    setSortedData(data);
  }, [data]);

  return (
    <div className={styles.container}>
      <h3 className={styles.headline}>Список ЦФО</h3>
      {isLoading ? (
        <p className={styles.loading}>Загрузка...</p>
      ) : !isLoading && sortedData?.length === 0 ? (
        <p className={styles.loading}>Список пуст</p>
      ) : (
        <>
          <div className={styles.table}>
            <div className={styles.header}>
              <div
                className={styles.cell}
                onClick={() => sortData('name')}
              >
                Название ЦФО{' '}
                {sortColumn === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </div>
              <div
                className={styles.cell}
                onClick={() => sortData('remainingBudget')}
              >
                Остаток бюджета{' '}
                {sortColumn === 'remainingBudget' &&
                  (sortOrder === 'asc' ? '↑' : '↓')}
              </div>
            </div>
            {paginatedData.map((cfo, index) => (
              <Link
                to={`/finance/${cfo.id}`}
                key={index}
                className={styles.row}
              >
                <div className={styles.cell}>{cfo.title}</div>
                <div className={styles.cell}>{cfo.budget} ₽</div>
              </Link>
            ))}
          </div>
          <Pagination
            prev
            next
            size='sm'
            total={sortedData?.length}
            limit={pageSize}
            activePage={activePage}
            onChangePage={setActivePage}
          />
        </>
      )}
    </div>
  );
};

export default CFOList;
