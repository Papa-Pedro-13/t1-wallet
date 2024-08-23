import React, { useState } from 'react';
import styles from './CFOList.module.css';
import { Link } from 'react-router-dom';

interface CFO {
  name: string;
  initialBudget: number;
  remainingBudget: number;
}

interface CFOListProps {
  list: CFO[];
}
type SortColumn = 'name' | 'initialBudget' | 'remainingBudget';
type SortOrder = 'asc' | 'desc';

const CFOList: React.FC<CFOListProps> = ({ list }) => {
  const [sortedData, setSortedData] = useState<CFO[]>(list);
  const [sortColumn, setSortColumn] = useState<SortColumn>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const sortData = (column: SortColumn) => {
    const newSortOrder =
      sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';

    const sorted = [...sortedData].sort((a, b) => {
      if (column === 'name') {
        return newSortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        return newSortOrder === 'asc'
          ? a[column] - b[column]
          : b[column] - a[column];
      }
    });

    setSortColumn(column);
    setSortOrder(newSortOrder);
    setSortedData(sorted);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.headline}>Список ЦФО</h3>
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
            onClick={() => sortData('initialBudget')}
          >
            Изначальный бюджет{' '}
            {sortColumn === 'initialBudget' &&
              (sortOrder === 'asc' ? '↑' : '↓')}
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
            to={'/finance/1'}
            key={index}
            className={styles.row}
          >
            <div className={styles.cell}>{cfo.name}</div>
            <div className={styles.cell}>{cfo.initialBudget} ₽</div>
            <div className={styles.cell}>{cfo.remainingBudget} ₽</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CFOList;
