import { useEffect, useState } from 'react';
import styles from './CFOList.module.css';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../app/store/store';
import { CFO } from '../model/cfoSlice';

type SortColumn = 'name' | 'initialBudget' | 'remainingBudget';
type SortOrder = 'asc' | 'desc';

const CFOList = () => {
  const { list, isLoading } = useAppSelector((state) => state.cfoList);

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
          ? a.amount - b.amount
          : b.amount - a.amount;
      }
    });

    setSortColumn(column);
    setSortOrder(newSortOrder);
    setSortedData(sorted);
  };
  useEffect(() => {
    if (!list) return;

    setSortedData(list);
  }, [list]);
  return (
    <div className={styles.container}>
      <h3 className={styles.headline}>Список ЦФО</h3>
      {isLoading ? (
        <p className={styles.loading}>Загрузка...</p>
      ) : !isLoading && list?.length === 0 ? (
        <p className={styles.loading}>Список пуст</p>
      ) : (
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
          {sortedData.map((cfo, index) => (
            <Link
              to={`/finance/${cfo.id}`}
              key={index}
              className={styles.row}
            >
              <div className={styles.cell}>{cfo.title}</div>
              <div className={styles.cell}>{cfo.amount} ₽</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CFOList;
