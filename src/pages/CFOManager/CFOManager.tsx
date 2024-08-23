import CFOCreate from '../../features/createCFO/ui/CFOCreate';
import CFOList from '../../features/cfoList/CFOList';
import styles from './CFOManager.module.css';

const cfoData = [
  { name: 'ЦФО Москва', initialBudget: 500000, remainingBudget: 200000 },
  {
    name: 'ЦФО Санкт-Петербург',
    initialBudget: 300000,
    remainingBudget: 100000,
  },
  { name: 'ЦФО Казань', initialBudget: 200000, remainingBudget: 150000 },
];

const CFOManager = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.headline}>Управление ЦФО</h2>
      <CFOCreate />
      <CFOList list={cfoData} />
    </div>
  );
};

export default CFOManager;
