import { useEffect, useState } from 'react';
import styles from './CashFlows.module.css';
import { BarChart, YAxis, Bars, LineChart, Line } from '@rsuite/charts';
import { DatePicker, Dropdown } from 'rsuite';
import isAfter from 'date-fns/isAfter';

const serverData = [
  { date: '2024-08-30', userCoins: 10000, centerCoins: 20000 },
  { date: '2024-08-29', userCoins: 10000, centerCoins: 20000 },
  { date: '2024-08-28', userCoins: 10000, centerCoins: 20000 },
  { date: '2024-08-27', userCoins: 10000, centerCoins: 80000 },
  { date: '2024-08-26', userCoins: 1000, centerCoins: 63000 },
  { date: '2024-08-25', userCoins: 20000, centerCoins: 70000 },
  { date: '2024-08-24', userCoins: 30000, centerCoins: 10000 },
  { date: '2024-08-23', userCoins: 45000, centerCoins: 100000 },
  { date: '2024-08-22', userCoins: 32000, centerCoins: 90000 },
  { date: '2024-08-21', userCoins: 19000, centerCoins: 23000 },
  { date: '2024-08-20', userCoins: 10000, centerCoins: 20000 },
  { date: '2024-08-19', userCoins: 10000, centerCoins: 80000 },
  { date: '2024-08-18', userCoins: 1000, centerCoins: 63000 },
  { date: '2024-08-17', userCoins: 20000, centerCoins: 70000 },
  { date: '2024-08-16', userCoins: 30000, centerCoins: 10000 },
  { date: '2024-08-15', userCoins: 45000, centerCoins: 100000 },
  { date: '2024-08-14', userCoins: 32000, centerCoins: 90000 },
  { date: '2024-08-13', userCoins: 19000, centerCoins: 23000 },
  { date: '2024-08-12', userCoins: 19000, centerCoins: 23000 },
  { date: '2024-08-11', userCoins: 19000, centerCoins: 23000 },
  { date: '2024-08-10', userCoins: 19000, centerCoins: 23000 },
  { date: '2024-08-09', userCoins: 10000, centerCoins: 80000 },
  { date: '2024-08-08', userCoins: 1000, centerCoins: 63000 },
  { date: '2024-08-07', userCoins: 20000, centerCoins: 70000 },
  { date: '2024-08-06', userCoins: 30000, centerCoins: 10000 },
  { date: '2024-08-05', userCoins: 45000, centerCoins: 100000 },
  { date: '2024-08-04', userCoins: 32000, centerCoins: 90000 },
  { date: '2024-08-03', userCoins: 19000, centerCoins: 23000 },
  { date: '2024-08-02', userCoins: 19000, centerCoins: 23000 },
  { date: '2024-08-01', userCoins: 19000, centerCoins: 23000 },
  { date: '2024-08-00', userCoins: 19000, centerCoins: 23000 },
  { date: '2024-07-30', userCoins: 10000, centerCoins: 20000 },
  { date: '2024-07-29', userCoins: 10000, centerCoins: 20000 },
  { date: '2024-07-28', userCoins: 10000, centerCoins: 20000 },
  { date: '2024-07-27', userCoins: 10000, centerCoins: 80000 },
  { date: '2024-07-26', userCoins: 1000, centerCoins: 63000 },
  { date: '2024-07-25', userCoins: 20000, centerCoins: 70000 },
  { date: '2024-07-24', userCoins: 30000, centerCoins: 10000 },
  { date: '2024-07-23', userCoins: 45000, centerCoins: 100000 },
  { date: '2024-07-22', userCoins: 32000, centerCoins: 90000 },
  { date: '2024-07-21', userCoins: 19000, centerCoins: 23000 },
  { date: '2024-07-20', userCoins: 10000, centerCoins: 20000 },
  { date: '2024-07-19', userCoins: 10000, centerCoins: 80000 },
  { date: '2024-07-18', userCoins: 1000, centerCoins: 63000 },
  { date: '2024-07-17', userCoins: 2000, centerCoins: 7000 },
  { date: '2024-07-16', userCoins: 3000, centerCoins: 1000 },
  { date: '2024-07-15', userCoins: 45000, centerCoins: 10000 },
  { date: '2024-07-14', userCoins: 32000, centerCoins: 9000 },
  { date: '2024-07-13', userCoins: 19000, centerCoins: 23000 },
  { date: '2024-07-12', userCoins: 19000, centerCoins: 23000 },
  { date: '2024-07-11', userCoins: 19000, centerCoins: 23000 },
  { date: '2024-07-10', userCoins: 19000, centerCoins: 23000 },
  { date: '2024-07-09', userCoins: 1000, centerCoins: 8000 },
  { date: '2024-07-08', userCoins: 1000, centerCoins: 63000 },
  { date: '2024-07-07', userCoins: 2000, centerCoins: 7000 },
  { date: '2024-07-06', userCoins: 3000, centerCoins: 1000 },
  { date: '2024-07-05', userCoins: 4500, centerCoins: 10000 },
  { date: '2024-07-04', userCoins: 3200, centerCoins: 9000 },
  { date: '2024-07-03', userCoins: 1900, centerCoins: 2300 },
  { date: '2024-07-02', userCoins: 1900, centerCoins: 2300 },
  { date: '2024-07-01', userCoins: 19000, centerCoins: 23000 },
  { date: '2024-07-00', userCoins: 19000, centerCoins: 23000 },
];

type BarType = [string, number, number, number];
type BarArray = BarType[];

const CashFlows = () => {
  const [isCoinsNominal, setIsCoinsNominal] = useState(true);
  const [month, setMonth] = useState<Date | null>(new Date());
  const [data, setData] = useState<BarArray>([]);

  useEffect(() => {
    setData(
      serverData
        .filter((value) => {
          return (
            new Date(value.date).getMonth() === month?.getMonth() &&
            new Date(value.date).getFullYear() === month?.getFullYear()
          );
        })
        .sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1))
        .map((day) => [
          day.date,
          day.centerCoins * (isCoinsNominal ? 1 : 10),
          day.userCoins * (isCoinsNominal ? 1 : 10),
          (day.centerCoins + day.userCoins) * (isCoinsNominal ? 1 : 10),
        ])
    );
  }, [isCoinsNominal, month]);

  return (
    <div className={styles.container}>
      <div className={styles.chart}>
        <div className={styles.filters}>
          <Dropdown
            title='Валюта номинала'
            onSelect={(e) => setIsCoinsNominal(e === 'Coins')}
          >
            <Dropdown.Item eventKey='Coins'>Коины</Dropdown.Item>
            <Dropdown.Item eventKey='Rubles'>Рубли</Dropdown.Item>
          </Dropdown>
          {/* <DateRangePicker
            value={period}
            onChange={(date) => setPeriod(date)}
            format='dd.MM.yyyy'
            placeholder='Выберите дату'
            showHeader={false}
            style={{ width: 300 }}
          /> */}
          <DatePicker
            oneTap
            value={month}
            onChange={(date) => setMonth(date)}
            shouldDisableDate={(date) => isAfter(date, new Date())}
            placeholder={'Выберите месяц для отчета'}
            format='yyyy-MM'
          />
        </div>
        <BarChart
          data={data}
          className={styles.chart}
        >
          <YAxis
            axisLabel={(value: number) => `${value / 1000}K`}
            minInterval={50000}
            splitLine={false}
          />
          <Bars name='Коины пользователей' />
          <Bars name='Коины ЦФО' />
          <Bars name='Все коины' />
        </BarChart>
        <LineChart data={data}>
          <YAxis
            // name='指标1'
            minInterval={30000}
          />

          <Line
            name='Коины пользователей'
            yAxisIndex={0}
          />
          <Line
            name='Коины ЦФО'
            yAxisIndex={0}
          />
          <Line
            name='Все коины'
            yAxisIndex={0}
          />
        </LineChart>
      </div>
    </div>
  );
};

export default CashFlows;
